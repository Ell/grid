import React from 'react';
import _ from 'lodash';

import GridButton from './GridButton';

const GridRow = ({ startNote, endNote, grid, clickHandler }) => {
  const columns = _.range(startNote, endNote + 1).map((note, index) => (
    <GridButton
      key={index}
      note={grid[note]}
      clickHandler={clickHandler}
    />)
  );

  return (
    <div className="grid-row">
      {columns}
    </div>
  );
};

export default GridRow;

GridRow.propTypes = {
  startNote: React.PropTypes.number,
  endNote: React.PropTypes.number,
  grid: React.PropTypes.object,
  clickHandler: React.PropTypes.func,
};
