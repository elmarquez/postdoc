import { APP } from '../types';

const DATABASE_DEFAULT = {
  files: [],
  mimetypes: [],
  tags: [],
  years: []
};

const INITIAL_STATE = {
  data: {},
  error: null,
  library: {},
  isDebugToolsVisible: false,
  isOutlinePanelVisible: true,
  isPending: false,
  isStatusBarVisible: true,
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
    case APP.LOAD_APPLICATION_STATE_FULFILLED: {
      const library = {
        ...state.library,
        data: Object.assign({}, DATABASE_DEFAULT, {
          ...action.payload.library
        }),
        path: action.payload.profile.library,
        isLoading: false
      };
      const profile = {
        ...state.profile,
        ...action.payload.profile,
        isLoading: false
      };
      return Object.assign({}, state, { library, profile });
    }
    case APP.LOAD_APPLICATION_STATE_PENDING: {
      const library = { ...state.library, isLoading: true };
      const profile = { ...state.profile, isLoading: true };
      return Object.assign({}, state, { library: library, profile: profile });
    }
    case APP.LOAD_APPLICATION_STATE_REJECTED: {
      const error = action.payload.message;
      const library = { ...state.library, error, isLoading: false };
      const profile = { ...state.profile, error, isLoading: false };
      return Object.assign({}, state, { library: library, profile: profile });
    }
    default:
      return state;
  }
}
