import { APP, LIBRARY, PROFILE, PROJECT } from '../types';

const INITIAL_STATE = {
  data: {
    library: '',
    recentProjects: [],
    settings: {}
  },
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
    case PROFILE.LOAD_PROFILE_FULFILLED: {
      const profile = {
        ...state.profile,
        data: action.payload,
        isLoading: false
      };
      return Object.assign({}, state, { profile });
    }
    case PROFILE.LOAD_PROFILE_PENDING: {
      const profile = { ...state.profile, error: null, isLoading: true };
      return Object.assign({}, state, { profile });
    }
    case PROFILE.LOAD_PROFILE_REJECTED: {
      const error = action.payload.message;
      const profile = { ...state.profile, error, isLoading: false };
      return Object.assign({}, state, { profile });
    }
    default:
      return state;
  }
}
