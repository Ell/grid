import { connect } from 'react-redux';
import {
  toggleNote,
  selectDevice,
  setDeviceList,
  startSequencer,
  sendMidiMessage,
  setVolume,
  setAttack,
  setDecay,
  setSustain,
  setRelease,
  setWaveType,
  setColor,
  setupSynth,
  resetGrid,
  resetParams,
  hydrateGrid,
  generateGridUrl,
} from '../actions/GridActions';

import launchpadInstance from '../utils/launchpad';

import Grid from '../components/Grid';

const mapStateToProps = (state) => (
  {
    grid: state.grid,
    launchpad: launchpadInstance.device,
    devices: launchpadInstance.devices,
    params: state.params,
    gridUrl: state.gridUrl,
  }
);

const mapDispatchToProps = (dispatch) => ({
  onButtonClick: (note) => {
    dispatch(toggleNote(note));
  },
  onDeviceSelect: (device) => {
    dispatch(selectDevice(device));
  },
  setDeviceList: (devices) => {
    dispatch(setDeviceList(devices));
  },
  selectDevice: (event) => {
    const deviceIndex = event.target.value;
    dispatch(selectDevice(deviceIndex));
  },
  startSequencer: () => {
    dispatch(startSequencer());
  },
  sendMidiMessage: (message) => {
    dispatch(sendMidiMessage(message));
  },
  setVolume: (volume) => {
    dispatch(setVolume(volume));
  },
  setAttack: (attack) => {
    dispatch(setAttack(attack));
  },
  setDecay: (decay) => {
    dispatch(setDecay(decay));
  },
  setSustain: (sustain) => {
    dispatch(setSustain(sustain));
  },
  setRelease: (release) => {
    dispatch(setRelease(release));
  },
  setWaveType: (type) => {
    dispatch(setWaveType(type));
  },
  setColor: (note, color) => {
    dispatch(setColor(note, color));
  },
  setupSynth: () => {
    dispatch(setupSynth());
  },
  resetGrid: () => {
    dispatch(resetGrid());
  },
  resetParams: () => {
    dispatch(resetParams());
    dispatch(setupSynth());
  },
  hydrateGrid: (data) => {
    dispatch(hydrateGrid(data));
  },
  generateGridUrl: () => {
    dispatch(generateGridUrl());
  },
});

const GridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);

export default GridContainer;
