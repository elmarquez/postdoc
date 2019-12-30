import {PROJECT} from '../types';

const DEFAULT_FILE_STATE = {
  changed: false,
  data: null,
  error: null,
  isPending: false,
  path: null
};

const INITIAL_STATE = {
  active: 0,
  files: [],
  error: null,
  isPending: false,
  path: null,
  tree: []
};

/**
 * Library state reducer.
 * @param {Object} state - Current state
 * @param {String} action - Action type
 * @returns {Object} next state
 */
export default function (state = INITIAL_STATE, action) {
  const {payload, type} = action;
  switch (type) {
    case PROJECT.CLOSE_FILE_FULFILLED: {
      return state;
    }
    case PROJECT.LOAD_FILE_TREE_FULFILLED: {
      return {...state, tree: payload, isPending: true};
    }
    case PROJECT.LOAD_FILE_TREE_PENDING: {
      return {...state, error: null, isPending: true};
    }
    case PROJECT.LOAD_FILE_TREE_REJECTED: {
      return {...state, error: payload, isPending: false};
    }
    case PROJECT.LOAD_INDEX_FULFILLED: {
      return {...state, data: payload, isPending: false};
    }
    case PROJECT.LOAD_INDEX_PENDING: {
      return {...state, error: null, isPending: true};
    }
    case PROJECT.LOAD_INDEX_REJECTED: {
      return {...state, error: payload.message, isPending: false};
    }
    case PROJECT.OPEN_FILE_FULFILLED: {
      const file = { ...DEFAULT_FILE_STATE, data: payload.data, path: payload.path};
      const active = state.files.length;
      const files = state.files.concat([file]);
      return { ...state, active, files, isPending: false };
    }
    case PROJECT.OPEN_FILE_PENDING: {
      return {...state, error: null, isPending: true};
    }
    case PROJECT.OPEN_FILE_REJECTED: {
      return {...state, error: payload, isPending: false};
    }
    case PROJECT.OPEN_PROJECT_FULFILLED: {
      return {...state, path: payload, isPending: false};
    }
    case PROJECT.OPEN_PROJECT_PENDING: {
      return {...state, error: null, isPending: true};
    }
    case PROJECT.OPEN_PROJECT_REJECTED: {
      return {...state, error: payload, isPending: false};
    }
    case PROJECT.SET_ACTIVE_FILE: {
      const active = state.files.findIndex((f) => f.path === action.data);
      return { ...state, active };
    }
    case PROJECT.UPDATE: {
      const data = {...state.library.data, ...action.payload};
      const library = {...state.library, data};
      return {...state, library};
    }
    case PROJECT.UPDATE_INDEX_FULFILLED: {
      const data = {...state.library.data, ...action.payload};
      const library = {...state.library, data, isIndexing: false};
      return {...state, library};
    }
    case PROJECT.UPDATE_INDEX_PENDING: {
      const library = {...state.library, error: null, isIndexing: true};
      return {...state, library};
    }
    case PROJECT.UPDATE_INDEX_REJECTED: {
      const error = action.payload.message;
      const library = {...state.library, error, isIndexing: false};
      return {...state, library};
    }
    case PROJECT.WRITE_INDEX_FULFILLED: {
      const library = {...state.library, isWriting: false};
      return {...state, library};
    }
    case PROJECT.WRITE_INDEX_PENDING: {
      const library = {...state.library, error: null, isWriting: true};
      return {...state, library};
    }
    case PROJECT.WRITE_INDEX_REJECTED: {
      const error = action.payload.message;
      const library = {...state.library, error, isWriting: false};
      return {...state, library};
    }
    default:
      return state;
  }
}
