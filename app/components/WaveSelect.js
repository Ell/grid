import React from 'react';

const WaveSelect = ({ callback, waveForm }) => {
  const _callback = (e) => callback(e.target.value);
  return (
    <select value={waveForm} onChange={_callback}>
      <option value="triangle">Triangle</option>
      <option value="sine">Sine</option>
      <option value="square">Square</option>
      <option value="sawtooth">Sawtooth</option>
    </select>
  );
};

WaveSelect.propTypes = {
  callback: React.PropTypes.func,
  waveForm: React.PropTypes.string,
};

export default WaveSelect;
