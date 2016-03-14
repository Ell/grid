import * as types from '../constants/ActionTypes';

import Tone from 'tone';
import synthInstance from '../utils/synth';

export const toggleNote = (note) => ({ type: types.TOGGLE_NOTE, note });
export const setDeviceList = (devices) => ({ type: types.SET_DEVICE_LIST, devices });
export const setAttack = (attack) => ({ type: types.SET_ATTACK, attack });
export const setDecay = (decay) => ({ type: types.SET_DECAY, decay });
export const setSustain = (sustain) => ({ type: types.SET_SUSTAIN, sustain });
export const setRelease = (release) => ({ type: types.SET_RELEASE, release });
export const setWaveType = (waveType) => ({ type: types.SET_WAVE_TYPE, waveType });
export const setVolume = (volume) => ({ type: types.SET_VOLUME, volume });

export function tick() {
  return (dispatch, getState) => {
    const { currentColumn } = getState();
    let nextColumn = currentColumn + 1;

    if (nextColumn > 7) {
      nextColumn = 0;
    }

    dispatch({
      type: types.SET_NEXT_COLUMN,
      column: nextColumn,
    });
  };
}

export function playNotes(notes) {
  return () => {
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
      const notes = noteIndexes.map((noteIndex) => grid[noteIndex].note);

      if (notes.length > 0) {
        dispatch(playNotes(notes));
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

export function sendMidiMessage(message) {
  return (dispatch, getState) => {
    const { launchpad } = getState();

    launchpad.output.send(message);
  };
}

export function selectDevice(deviceIndex) {
  return (dispatch, getState) => {
    const { devices } = getState();
    const device = devices[deviceIndex];

    // Reset launchpad and set to XY mode
    device.output.send([0x80, 0x00, 0x00]);
    device.output.send([0x80, 0x00, 0x01]);

    device.input.onmidimessage = (message) => dispatch(receiveMidiMessage(message));

    dispatch({
      type: types.SELECT_DEVICE,
      device,
    });
  };
}
