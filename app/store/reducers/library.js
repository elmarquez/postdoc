import { APP, LIBRARY, PROFILE, PROJECT } from '../types';

const DATABASE_DEFAULT = {
  files: [],
  mimetypes: [],
  tags: [],
  years: []
};

const INITIAL_STATE = {
  data: DATABASE_DEFAULT,
  error: null,
  isIndexing: false,
  isLoading: false,
  isWriting: false,
  path: null
};

/**
 * Project state reducer.
 * @param {Object} state - Current state
 * @param {String} action - Action type
 * @returns {Object} next state
 */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LIBRARY.LOAD_INDEX_FULFILLED: {
      const library = {
        ...state.library,
        data: { ...state.library.data, ...action.payload },
        isLoading: false
      };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.LOAD_INDEX_PENDING: {
      const library = {
        ...state.library,
        error: null,
        isLoading: true,
        path: state.profile.library
      };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.LOAD_INDEX_REJECTED: {
      const error = action.payload.message;
      const library = { ...state.library, error, isLoading: false };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.UPDATE: {
      const data = Object.assign({}, state.library.data, action.payload);
      const library = { ...state.library, data };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.UPDATE_INDEX_FULFILLED: {
      const data = { ...state.library.data, ...action.payload };
      const library = { ...state.library, data, isIndexing: false };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.UPDATE_INDEX_PENDING: {
      const library = { ...state.library, error: null, isIndexing: true };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.UPDATE_INDEX_REJECTED: {
      const error = action.payload.message;
      const library = { ...state.library, error, isIndexing: false };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.WRITE_INDEX_FULFILLED: {
      const library = { ...state.library, isWriting: false };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.WRITE_INDEX_PENDING: {
      const library = { ...state.library, error: null, isWriting: true };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.WRITE_INDEX_REJECTED: {
      const error = action.payload.message;
      const library = { ...state.library, error, isWriting: false };
      return Object.assign({}, state, { library });
    }
    default:
      return state;
  }
}
