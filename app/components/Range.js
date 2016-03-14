import React from 'react';

const Range = ({ currentValue, start, end, callback, step }) => {
  const _onChange = (e) => callback(e.target.value);

  return (
    <input
      className="ui range"
      type="range"
      onChange={_onChange}
      min={start}
      max={end}
      value={currentValue}
      step={step}
    />
  );
};

Range.propTypes = {
  currentValue: React.PropTypes.string,
  start: React.PropTypes.number,
  end: React.PropTypes.number,
  callback: React.PropTypes.func,
  step: React.PropTypes.number,
};

export default Range;
