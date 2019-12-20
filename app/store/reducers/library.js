import { LIBRARY } from '../types';

const INITIAL_STATE = {
    data: null,
    error: null,
    isPending: false
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
        return { ...state, library };
      }
      case LIBRARY.LOAD_INDEX_PENDING: {
        const library = {
          ...state.library,
          error: null,
          isLoading: true,
          path: state.profile.library
        };
        return { ...state, library };
      }
      case LIBRARY.LOAD_INDEX_REJECTED: {
        const error = action.payload.message;
        const library = { ...state.library, error, isLoading: false };
        return { ...state, library };
      }
      case LIBRARY.UPDATE: {
        console.info('library update!');
        const data = { ...state.library.data, ...action.payload };
        const library = { ...state.library, data };
        return { ...state, library };
      }
      case LIBRARY.UPDATE_INDEX_FULFILLED: {
        const data = { ...state.library.data, ...action.payload };
        const library = { ...state.library, data, isIndexing: false };
        return { ...state, library };
      }
      case LIBRARY.UPDATE_INDEX_PENDING: {
        const library = { ...state.library, error: null, isIndexing: true };
        return { ...state, library };
      }
      case LIBRARY.UPDATE_INDEX_REJECTED: {
        const error = action.payload.message;
        const library = { ...state.library, error, isIndexing: false };
        return { ...state, library };
      }
      case LIBRARY.WRITE_INDEX_FULFILLED: {
        const library = { ...state.library, isWriting: false };
        return { ...state, library };
      }
      case LIBRARY.WRITE_INDEX_PENDING: {
        const library = { ...state.library, error: null, isWriting: true };
        return { ...state, library };
      }
      case LIBRARY.WRITE_INDEX_REJECTED: {
        const error = action.payload.message;
        const library = { ...state.library, error, isWriting: false };
        return { ...state, library };
      }
      default:
        return state;
    }
  }
  