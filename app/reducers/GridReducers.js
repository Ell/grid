import * as types from '../constants/ActionTypes';
import { gridRows, notes } from '../constants/Grid';

import _ from 'lodash';

const gridState = {};

gridRows.forEach((row, index) => {
  _.range(row[0], row[1] + 1).forEach((note, column) => {
    gridState[note] = {
      id: note,
      color: null,
      enabled: false,
      row: index,
      column,
      note: notes[index],
    };
  });
});

const initialState = {
  currentColumn: 0,
  params: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.2,
    release: 0.4,
    waveType: 'triangle',
    volume: -25,
  },
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
    case types.SET_NEXT_COLUMN: {
      return {
        ...state,
        currentColumn: action.column,
      };
    }
    case types.SET_ATTACK: {
      return {
        ...state,
        params: {
          ...state.params,
          attack: action.attack,
        },
      };
    }
    case types.SET_DECAY: {
      return {
        ...state,
        params: {
          ...state.params,
          decay: action.decay,
        },
      };
    }
    case types.SET_SUSTAIN: {
      return {
        ...state,
        params: {
          ...state.params,
          sustain: action.sustain,
        },
      };
    }
    case types.SET_RELEASE: {
      return {
        ...state,
        params: {
          ...state.params,
          release: action.release,
        },
      };
    }
    case types.SET_WAVE_TYPE: {
      return {
        ...state,
        params: {
          ...state.params,
          waveType: action.waveType,
        },
      };
    }
    case types.SET_VOLUME: {
      return {
        ...state,
        params: {
          ...state.params,
          volume: action.volume,
        },
      };
    }
    default:
      return state;
  }
};

export default gridReducer;
