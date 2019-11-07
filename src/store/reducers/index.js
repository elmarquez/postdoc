// import { combineReducers } from "redux";
// import application from "./application";
// import library from "./library";
// import profile from "./profile";
// import project from "./project";
// export default combineReducers({ application, library, profile, project });

import {APP, LIBRARY, PROFILE, PROJECT} from "../actions/actionTypes";

const INITIAL_STATE = {
  app: {
    isDebugToolsVisible: false,
    isOutlinePanelVisible: true,
    isStatusBarVisible: true,
  },
  library: {
    files: [],
    isIndexing: false,
    isLoading: false,
    lastUpdated: new Date(),
    tags: []
  },
  profile: {
    isLoading: false,
    library: "",
    recentProjects: [
      { name: 'My Project', path: '/Users/dmarques/Documents/src/doc/postdoc' },
      { name: 'My Project 2', path: '/Users/dmarques/Documents/src/doc' }
    ],
    settings: {}
  },
  project: {
    files: {},
    isIndexing: false,
    isLoading: false,
    lastUpdated: new Date(),
    path: "/Users/dmarques/Documents/src/fm/paper",
    tags: {}
  }
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
      const library = {...state.library, ...action.payload.library};
      const profile = {...state.profile, ...action.payload.profile};
      return Object.assign({}, state, {library: library, profile: profile});
    }
    case APP.UPDATE_PREFERENCE_FULFILLED: {
      return Object.assign({}, state, action.payload);
    }
    case LIBRARY.ADD_FILE: {
      return { ...state, ...action };
    }
    case LIBRARY.ADD_TAG: {
      return { ...state, ...action };
    }
    case LIBRARY.DELETE_FILE: {
      return { ...state, ...action };
    }
    case LIBRARY.DELETE_TAG: {
      return { ...state, ...action };
    }
    case LIBRARY.LOAD_LIBRARY_INDEX: {
      return Object.assign({}, state, {...action.payload});
    }
    case LIBRARY.UPDATE_FILE: {
      return { ...state, ...action };
    }
    case LIBRARY.UPDATE_INDEX: {
      return { ...state, ...action };
    }
    case LIBRARY.UPDATE_TAG: {
      return { ...state, ...action };
    }
    case PROFILE.LOAD_PROFILE: {
      return Object.assign({}, state, action.payload);
    }
    case PROFILE.UPDATE_PROFILE: {
      return Object.assign({}, state, action.payload);
    }
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
