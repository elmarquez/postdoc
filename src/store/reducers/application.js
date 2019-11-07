import { APPLICATION } from "../actions/actionTypes";

const INITIAL_STATE = {
  components: {},
  isLoading: false,
  isOutlinePanelVisible: true,
  isStatusBarVisible: true,
  recentProjects: [
    { name: 'My Project', path: '/Users/dmarques/Documents/src/doc/postdoc' }
  ],
};

/**
 * Project state reducer.
 * @param {Object} state - Current state
 * @param {String} action - Action type
 * @returns {Object} next state
 */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case APPLICATION.LOAD_APPLICATION_STATE_FULFILLED: {
      return Object.assign({}, state, action.payload);
    }
    case APPLICATION.UPDATE_PREFERENCE_FULFILLED: {
      return Object.assign({}, state, action.payload);
    }
    default:
      return state;
  }
}
