import { PROFILE } from "../actions/actionTypes";

const INITIAL_STATE = {
  library: null,
  recent: [],
  settings: {}
};

/**
 * User profile state reducer.
 * @param {Object} state - Current state
 * @param {String} action - Action type
 * @returns {Object} next state
 */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PROFILE.LOAD_PROFILE: {
      return Object.assign({}, state, action.payload);
    }
    case PROFILE.UPDATE_PROFILE: {
      return Object.assign({}, state, action.payload);
    }
    default:
      return state;
  }
}
