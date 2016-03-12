import * as types from '../constants/ActionTypes';

export const nextBeat = () => ({ type: types.NEXT_BEAT });
export const playNote = (note) => ({ type: types.PLAY_NOTE, note });
export const playSequence = () => ({ type: types.PLAY_SEQUENCE });
export const stopSequence = () => ({ type: types.STOP_SEQUENCE });
export const toggleNote = (note) => ({ type: types.TOGGLE_NOTE, note });
export const setDeviceList = (devices) => ({ type: types.SET_DEVICE_LIST, devices });
export const sendMidiMessage = (message) => ({ type: types.SEND_MIDI, message });

export function receiveMidiMessage(message) {
  return (dispatch) => {
    if (message.data[0] === 144 && message.data[2] === 127) {
      dispatch(toggleNote(message.data[1]));
    }
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
