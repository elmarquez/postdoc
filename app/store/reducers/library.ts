import { LIBRARY } from '../types';

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
  isPending: false,
  library: {},
  path: null,
  profile: {}
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
      const data: any = state.library;
      const library = {
        ...state.library,
        data: { ...data, ...action.payload },
        isPending: false
      };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.LOAD_INDEX_PENDING: {
      const profile: any = state.profile;
      const library = {
        ...state.library,
        error: null,
        isPending: true,
        path: profile.library
      };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.LOAD_INDEX_REJECTED: {
      const error = action.payload.message;
      const library = { ...state.library, error, isPending: false };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.UPDATE: {
      const current: any = state.library;
      const data = Object.assign({}, current.data, action.payload);
      const library = { ...state.library, data };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.UPDATE_INDEX_FULFILLED: {
      const current: any = state.library;
      const data = { ...current.data, ...action.payload };
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
      const library = { ...state.library, isPending: false };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.WRITE_INDEX_PENDING: {
      const library = { ...state.library, error: null, isPending: true };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.WRITE_INDEX_REJECTED: {
      const error = action.payload.message;
      const library = { ...state.library, error, isPending: false };
      return Object.assign({}, state, { library });
    }
    default:
      return state;
  }
}
