import { PROJECT } from "../actions/actionTypes";

const INITIAL_STATE = {
  files: {},
  isIndexing: false,
  isLoading: false,
  lastUpdated: new Date(),
  path: "/Users/dmarques/Documents/src/fm/paper",
  tags: {}
};

/**
 * Project state reducer.
 * @param {Object} state - Current state
 * @param {String} action - Action type
 * @returns {Object} next state
 */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PROJECT.ADD_FILE: {
      return state;
    }
    case PROJECT.ADD_TAG: {
      return state;
    }
    case PROJECT.CLONE_PROJECT: {
      return state;
    }
    default:
      return state;
  }
}
