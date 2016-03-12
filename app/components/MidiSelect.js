import React from 'react';

const MidiSelect = ({ devices, callback }) => {
  const deviceList = devices.map((device, index) =>
    <option key={index} value={index}>{device.name}</option>
  );

  return (
    <select onChange={callback}>
      <option></option>
      {deviceList}
    </select>
  );
};

MidiSelect.propTypes = {
  devices: React.PropTypes.array,
  callback: React.PropTypes.func,
};

MidiSelect.defaultProps = {
  devices: [],
  callback: null,
};

export default MidiSelect;
