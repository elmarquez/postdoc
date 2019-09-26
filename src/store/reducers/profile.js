import { PROFILE } from "../actions/actionTypes";

const INITIAL_STATE = {
  isLoading: false,
  data: {
    library: null
  }
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
      return { ...state, data: action.data, isLoading: action.isLoading };
    }
    case PROFILE.UPDATE_PROFILE: {
      return { ...state, data: action.data, isLoading: action.isLoading };
    }
    default:
      return state;
  }
}
