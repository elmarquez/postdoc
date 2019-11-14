import { LIBRARY } from "../actions/actionTypes";

const INITIAL_STATE = {
  data: {},
  error: null,
  isIndexing: false,
  isLoading: false,
  isWriting: false,
  lastUpdated: new Date(),
  path: null,
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
    case LIBRARY.LOAD_INDEX_FULFILLED: {
      return { ...state, data: action.payload, isLoading: false };
    }
    case LIBRARY.LOAD_INDEX_PENDING: {
      return { ...state, data: {}, error: null, isLoading: true };
    }
    case LIBRARY.LOAD_INDEX_REJECTED: {
      return { ...state, data: {}, error: action.error, isLoading: false };
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
    case LIBRARY.WRITE_INDEX_FULFILLED: {
      return { ...state, data: action.payload, error: null, isWriting: false, lastUpdated: new Date() };
    }
    case LIBRARY.WRITE_INDEX_PENDING: {
      return { ...state, error: null, isWriting: true };
    }
    case LIBRARY.WRITE_INDEX_REJECTED: {
      return { ...state, error: action.error, isWriting: false, lastUpdated: new Date() };
    }
    default:
      return state;
  }
}
