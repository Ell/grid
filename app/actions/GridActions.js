import * as types from '../constants/ActionTypes';

import Tone from 'tone';
import synthInstance from '../utils/synth';
import launchpadInstance from '../utils/launchpad';

export const setAttack = (attack) => ({ type: types.SET_ATTACK, attack });
export const setDecay = (decay) => ({ type: types.SET_DECAY, decay });
export const setSustain = (sustain) => ({ type: types.SET_SUSTAIN, sustain });
export const setRelease = (release) => ({ type: types.SET_RELEASE, release });
export const setWaveType = (waveType) => ({ type: types.SET_WAVE_TYPE, waveType });
export const setVolume = (volume) => ({ type: types.SET_VOLUME, volume });
export const resetParams = () => ({ type: types.RESET_PARAMS });

export function setupSynth() {
  return (dispatch, getState) => {
    const { params } = getState();
    const synth = synthInstance.instance;
    synth.set({
      envelope: {
        attack: params.attack,
        decay: params.decay,
        sustain: params.sustain,
        release: params.release,
      },
      oscillator: {
        type: params.waveType,
      },
    });
    synth.volume.value = params.volume;
  };
}

export function sendMidiMessage(message) {
  return () => {
    const launchpad = launchpadInstance.device;
    if (launchpad) {
      launchpad.output.send(message);
    }
  };
}

export function setColor(note, color) {
  return (dispatch) => {
    switch (color) {
      case 'green': {
        dispatch(sendMidiMessage([0x90, note.toString(16), 0x3C]));
        break;
      }
      case 'lightgreen': {
        dispatch(sendMidiMessage([0x90, note.toString(16), 0x1C]));
        break;
      }
      default: {
        dispatch(sendMidiMessage([0x90, note.toString(16), 0x0C]));
      }
    }
    dispatch({
      type: types.SET_COLOR,
      note,
      color,
    });
  };
}

export function syncLaunchpad() {
  return (dispatch, getState) => {
    const { grid } = getState();
    Object.keys(grid).forEach((note) => dispatch(setColor(note, grid[note].color)));
  };
}

export function resetGrid() {
  return (dispatch) => {
    dispatch({
      type: types.RESET_GRID,
    });
    dispatch(syncLaunchpad());
  };
}

export function toggleNote(note) {
  return (dispatch) => {
    dispatch({
      type: types.TOGGLE_NOTE,
      note,
    });

    dispatch(syncLaunchpad());
  };
}

export function tick() {
  return (dispatch, getState) => {
    const { currentColumn, grid } = getState();
    let nextColumn = currentColumn + 1;

    Object.keys(grid).filter((noteIndex) => (
      grid[noteIndex].enabled && grid[noteIndex].column === currentColumn
    )).forEach((note) => dispatch(setColor(note, 'lightgreen')));

    Object.keys(grid).filter((noteIndex) => {
      let lastColumn = currentColumn - 1;
      if (lastColumn < 0) {
        lastColumn = 7;
      }
      return grid[noteIndex].enabled && grid[noteIndex].column === lastColumn;
    }).forEach((note) => dispatch(setColor(note, 'green')));

    if (nextColumn > 7) {
      nextColumn = 0;
    }

    dispatch({
      type: types.SET_NEXT_COLUMN,
      column: nextColumn,
    });
  };
}

export function playNotes(noteIndexes) {
  return (dispatch, getState) => {
    const { grid } = getState();
    const notes = noteIndexes.map((noteIndex) => grid[noteIndex].note);
    const synth = synthInstance.instance;

    synth.triggerAttackRelease(notes, '8n');
  };
}

export function startSequencer() {
  return (dispatch, getState) => {
    Tone.Transport.start();

    const columnLoop = new Tone.Loop(() => {
      const { currentColumn, grid } = getState();
      const noteIndexes = Object.keys(grid).filter((noteIndex) =>
        grid[noteIndex].enabled && grid[noteIndex].column === currentColumn);

      if (noteIndexes.length > 0) {
        dispatch(playNotes(noteIndexes));
      }

      dispatch(tick());
    }, '8n');

    columnLoop.start(0);
    Tone.Transport.start();
  };
}

export function receiveMidiMessage(message) {
  return (dispatch) => {
    if (message.data[0] === 144 && message.data[2] === 127) {
      dispatch(toggleNote(message.data[1]));
    }
  };
}

export function setDeviceList(devices) {
  return () => {
    launchpadInstance.devices = devices;
  };
}

export function selectDevice(deviceIndex) {
  return (dispatch) => {
    const devices = launchpadInstance.devices;
    const device = devices[deviceIndex];

    // Reset launchpad and set to XY mode
    device.output.send([0x80, 0x00, 0x00]);
    device.output.send([0x80, 0x00, 0x01]);

    device.input.onmidimessage = (message) => dispatch(receiveMidiMessage(message));

    launchpadInstance.device = device;

    dispatch(syncLaunchpad());
  };
}

export function generateGridUrl() {
  return (dispatch, getState) => {
    const state = getState();

    const enabledItems = Object.keys(state.grid).filter((note) => (
      state.grid[note].enabled
    ));

    const exportedState = window.btoa(JSON.stringify({
      enabledItems,
      params: state.params,
    }));

    const loc = window.location;
    const baseUrl = `${loc.protocol}//${loc.host}${loc.pathname}`;
    const url = `${baseUrl}?state=${exportedState}`;
    dispatch({
      type: types.SET_GRID_URL,
      url,
    });
  };
}

export function hydrateGrid(data) {
  return (dispatch) => {
    const importedState = JSON.parse(window.atob(data));
    const { params, enabledItems } = importedState;

    enabledItems.forEach((item) => dispatch(toggleNote(item)));
    dispatch(setAttack(params.attack));
    dispatch(setDecay(params.decay));
    dispatch(setSustain(params.sustain));
    dispatch(setRelease(params.release));
    dispatch(setVolume(params.volume));
    dispatch(setWaveType(params.waveType));
  };
}
