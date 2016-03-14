import React from 'react';

const GridButton = ({ clickHandler, note }) => {
  const _onClick = () => {
    clickHandler(note.id);
  };

  let className = 'grid-column';

  switch (note.color) {
    case 'green': {
      className = `${className} grid-button-enabled`;
      break;
    }
    case 'lightgreen': {
      className = `${className} grid-button-playing`;
      break;
    }
    default: {
      className = `${className} grid-button-disabled`;
    }
  }

  return <div className={className} onClick={_onClick}></div>;
};

export default GridButton;

GridButton.propTypes = {
  note: React.PropTypes.object,
  clickHandler: React.PropTypes.func,
};
