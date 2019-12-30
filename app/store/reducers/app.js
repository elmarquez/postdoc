import { APP } from '../types';

const INITIAL_STATE = {
  data: {},
  error: null,
  isDebugToolsVisible: false,
  isOutlinePanelVisible: true,
  isPending: false,
  isStatusBarVisible: true
};

/**
 * Application state reducer.
 * @param {Object} state - Current state
 * @param {String} action - Action type
 * @returns {Object} next state
 */
export default function(state = INITIAL_STATE, action) {
  const { payload, type } = action;
    switch (type) {
      case APP.LOAD_APPLICATION_STATE_FULFILLED: {
        const library = {
          ...state.library,
          data: { ...state.data, ...action.payload.library },
          path: payload.profile.library,
          isLoading: false
        };
        const profile = {
          ...state.profile,
          ...action.payload.profile,
          isLoading: false
        };
        return { ...state, library, profile };
      }
      case APP.LOAD_APPLICATION_STATE_PENDING: {
        const library = { ...state.library, isLoading: true };
        const profile = { ...state.profile, isLoading: true };
        return { ...state, library, profile };
      }
      case APP.LOAD_APPLICATION_STATE_REJECTED: {
        const error = action.payload.message;
        const library = { ...state.library, error, isLoading: false };
        const profile = { ...state.profile, error, isLoading: false };
        return { ...state, library, profile };
      }
      default:
        return state;
    }
  }
