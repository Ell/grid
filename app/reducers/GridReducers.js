import * as types from '../constants/ActionTypes';
import { gridRows } from '../constants/Grid';

import _ from 'lodash';

const gridState = {};

gridRows.forEach((row, index) => {
  _.range(row[0], row[1] + 1).forEach((note, column) => (
    gridState[note] = {
      id: note,
      color: null,
      enabled: false,
      row: index,
      column,
    }
  ));
});

const initialState = {
  synth: null,
  launchpad: null,
  devices: [],
  grid: gridState,
};

const gridReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_NOTE: {
      const enabled = !state.grid[action.note].enabled;
      const color = enabled ? 'green' : null;
      const note = state.grid[action.note];
      return {
        ...state,
        grid: {
          ...state.grid,
          [action.note]: { ...note, enabled, color },
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
    case types.SET_SYNTH: {
      return {
        ...state,
        synth: action.synth,
      };
    }
    default:
      return state;
  }
};

export default gridReducer;
