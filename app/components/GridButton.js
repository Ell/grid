import React from 'react';

const GridButton = ({ note }) => {
  let className = 'grid-column';

  switch (note.color) {
    case 'green':
      className = `${className} grid-button-enabled`;
      break;
    default:
      className = `${className} grid-button-disabled`;
  }

  return <div className={className}></div>;
};

export default GridButton;

GridButton.propTypes = {
  note: React.PropTypes.object,
};
