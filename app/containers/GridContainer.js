import { connect } from 'react-redux';
import { toggleNote, selectDevice, setDeviceList } from '../actions/GridActions';

import Grid from '../components/Grid';

const mapStateToProps = (state) => {
  return {
    grid: state.grid,
    devices: state.devices,
    launchpad: state.launchpad,
  };
};

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
});

const GridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);

export default GridContainer;
