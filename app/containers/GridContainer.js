import { connect } from 'react-redux';
import {
  toggleNote,
  selectDevice,
  setDeviceList,
  setSynth,
  startSequencer,
  sendMidiMessage,
  setVolume,
  setAttack,
  setDecay,
  setSustain,
  setRelease,
  setWaveType,
} from '../actions/GridActions';

import Grid from '../components/Grid';

const mapStateToProps = (state) => (
  {
    grid: state.grid,
    devices: state.devices,
    launchpad: state.launchpad,
    params: state.params,
    synth: state.synth,
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
  setSynth: (synth) => {
    dispatch(setSynth(synth));
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
});

const GridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);

export default GridContainer;
