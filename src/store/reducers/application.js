import { APPLICATION } from "../actions/actionTypes";

// projects is a map from the project ID to the project object
const INITIAL_STATE = {
  isLoading: false
};

/**
 * Project state reducer.
 * @param {Object} state - Current state
 * @param {String} action - Action type
 * @returns {Object} next state
 */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case APPLICATION.DELETE_PREFERENCE: {
      return state;
    }
    case APPLICATION.GET_PREFERENCE: {
      return state;
    }
    case APPLICATION.UPDATE_PREFERENCE: {
      return state;
    }
    default:
      return state;
  }
}
