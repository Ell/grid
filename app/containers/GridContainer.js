import { connect } from 'react-redux';
import {
  toggleNote,
  selectDevice,
  setDeviceList,
  setSynth,
} from '../actions/GridActions';

import Grid from '../components/Grid';

const mapStateToProps = (state) => (
  { grid: state.grid, devices: state.devices, launchpad: state.launchpad }
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
});

const GridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);

export default GridContainer;
