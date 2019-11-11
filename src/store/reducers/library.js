import { LIBRARY } from "../actions/actionTypes";

const INITIAL_STATE = {
  files: [],
  isIndexing: false,
  isLoading: false,
  lastUpdated: new Date(),
  path: null,
  tags: []
};

/**
 * Library state reducer.
 * @param {Object} state - Current state
 * @param {String} action - Action type
 * @returns {Object} next state
 */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LIBRARY.ADD_FILE: {
      return { ...state, ...action };
    }
    case LIBRARY.ADD_TAG: {
      return { ...state, ...action };
    }
    case LIBRARY.DELETE_FILE: {
      return { ...state, ...action };
    }
    case LIBRARY.DELETE_TAG: {
      return { ...state, ...action };
    }
    case LIBRARY.LOAD_LIBRARY_INDEX: {
      return { ...state, files: action.data.files, isLoading: action.isLoading, tags: action.data.tags };
    }
    case LIBRARY.UPDATE_FILE: {
      return { ...state, ...action };
    }
    case LIBRARY.UPDATE_INDEX: {
      return { ...state, ...action };
    }
    case LIBRARY.UPDATE_TAG: {
      return { ...state, ...action };
    }
    case LIBRARY.WRITE_INDEX: {
      return { ...state, lastUpdated: new Date() };
    }
    default:
      return state;
  }
}
