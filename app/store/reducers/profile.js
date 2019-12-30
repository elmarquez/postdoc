import { PROFILE } from '../types';

const INITIAL_STATE = {
    data: null,
    error: null,
    isPending: false
};

/**
 * Profile state reducer.
 * @param {Object} state - Current state
 * @param {String} action - Action type
 * @returns {Object} next state
 */
export default function(state = INITIAL_STATE, action) {
    const { payload, type } = action;
    switch (type) {
      case PROFILE.LOAD_PROFILE_FULFILLED: {
        return { ...state, data: payload, isPending: false };
      }
      case PROFILE.LOAD_PROFILE_PENDING: {
        return { ...state, error: null, isPending: true };
      }
      case PROFILE.LOAD_PROFILE_REJECTED: {
        return { ...state, error: payload, isPending: false };
      }
      default:
        return state;
    }
  }
