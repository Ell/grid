import React from 'react';

import { scales } from '../constants/Grid';

const ScaleSelect = ({ callback, scale }) => {
  const _callback = (e) => {
    callback(scales[e.target.value]);
  };

  const scaleOptions = Object.keys(scales).map((s) => {
    const scaleObject = scales[s];
    return <option value={s}>{scaleObject.name}</option>;
  });

  return (
    <select value={scale.id} onChange={_callback}>
      {scaleOptions}
    </select>
  );
};

ScaleSelect.propTypes = {
  callback: React.PropTypes.func,
  scale: React.PropTypes.string,
};

export default ScaleSelect;
