import { PROJECT } from '../types';

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
      case PROJECT.CREATE_PROJECT: {
        return state;
      }
      default:
        return state;
    }
  }
  