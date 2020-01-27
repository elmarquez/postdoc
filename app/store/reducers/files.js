import {FILES} from '../types';

const DEFAULT_FILE_STATE = {
  data: null,
  error: null,
  filename: null,
  isChanged: false,
  isPending: false,
  path: null,
  type: null
};

const INITIAL_STATE = {
  active: null,
  files: [],
  isPending: false
};

/**
 * Files state reducer.
 * @param {Object} state - Current state
 * @param {String} action - Action type
 * @returns {Object} next state
 */
export default function (state = INITIAL_STATE, action) {
  const { payload } = action;
  switch (action.type) {
    case FILES.CLOSE_FILE_FULFILLED: {
      let { active, files } = state;
      files = files.filter((f, i) => {
        if (f.path === payload) {
          if (active === i) {
            active = active > 0 ? active - 1 : 0;
          }
          return false;
        }
        return true;
      });
      return { ...state, active, files };
    }
    case FILES.OPEN_FILE_FULFILLED: {
      const { data, filename, path, type } = payload;
      const file = { ...DEFAULT_FILE_STATE, data, filename, path, type };
      const active = state.files.length;
      const files = state.files.concat([file]);
      return { ...state, active, files, isPending: false };
    }
    case FILES.OPEN_FILE_PENDING: {
      return {...state, error: null, isPending: true};
    }
    case FILES.OPEN_FILE_REJECTED: {
      return {...state, error: payload, isPending: false};
    }
    case FILES.SET_ACTIVE_FILE: {
      const active = state.files.findIndex((f) => f.path === action.data);
      return { ...state, active };
    }
    default:
      return state;
  }
}
