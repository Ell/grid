import * as types from '../constants/ActionTypes';

import _ from 'lodash';

const gridRows = [
  [0, 7],
  [16, 23],
  [32, 39],
  [48, 55],
  [64, 71],
  [80, 87],
  [96, 103],
  [112, 119],
];

const gridState = {};

gridRows.forEach((row) => {
  _.range(row[0], row[1] + 1).forEach((note) => (
    gridState[note] = { id: note, color: null, enabled: false }
  ));
});

const initialState = {
  launchpad: null,
  devices: [],
  grid: gridState,
};

const gridReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_NOTE: {
      const enabled = !state.grid[action.note].enabled;
      const color = enabled ? 'green' : null;
      return {
        ...state,
        grid: {
          ...state.grid,
          [action.note]: { id: action.note, enabled, color },
        },
      };
    }
    case types.SELECT_DEVICE: {
      return {
        ...state,
        launchpad: action.device,
      };
    }
    case types.SET_DEVICE_LIST: {
      return {
        ...state,
        devices: action.devices,
      };
    }
    default:
      return state;
  }
};

export default gridReducer;
