import {APP, LIBRARY, PROFILE, PROJECT} from "../types";

const APP_DEFAULT = {
  error: null,
  isDebugToolsVisible: false,
  isOutlinePanelVisible: true,
  isStatusBarVisible: true,
};

const DATABASE_DEFAULT = {
  files: [],
  mimetypes: [],
  tags: [],
  years: []
};

const LIBRARY_DEFAULT = {
  data: DATABASE_DEFAULT,
  error: null,
  isIndexing: false,
  isLoading: false,
  isWriting: false,
  path: null,
};

const PROFILE_DEFAULT = {
  data: {
    library: "",
    recentProjects: [],
    settings: {}
  },
  error: null,
  isLoading: false,
  isWriting: false,
};

const PROJECT_DEFAULT = {
  data: DATABASE_DEFAULT,
  error: null,
  isIndexing: false,
  isLoading: false,
  isWriting: false,
  path: "",
};

const INITIAL_STATE = {
  app: APP_DEFAULT,
  library: LIBRARY_DEFAULT,
  profile: PROFILE_DEFAULT,
  project: PROJECT_DEFAULT
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
        data: Object.assign({}, DATABASE_DEFAULT, {...action.payload.library}),
        path: action.payload.profile.library,
        isLoading: false
      };
      const profile = {
        ...state.profile,
        ...action.payload.profile,
        isLoading: false
      };
      return Object.assign({}, state, {library, profile});
    }
    case APP.LOAD_APPLICATION_STATE_PENDING: {
      const library = {...state.library, isLoading: true};
      const profile = {...state.profile, isLoading: true};
      return Object.assign({}, state, {library: library, profile: profile});
    }
    case APP.LOAD_APPLICATION_STATE_REJECTED: {
      const error = action.payload.message;
      const library = {...state.library, error, isLoading: false};
      const profile = {...state.profile, error, isLoading: false};
      return Object.assign({}, state, {library: library, profile: profile});
    }
    case LIBRARY.LOAD_INDEX_FULFILLED: {
      const library = {
        ...state.library,
        data: { ...state.library.data, ...action.payload },
        isLoading: false
      };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.LOAD_INDEX_PENDING: {
      const library = {
        ...state.library,
        error: null,
        isLoading: true,
        path: state.profile.library
      };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.LOAD_INDEX_REJECTED: {
      const error = action.payload.message;
      const library = { ...state.library, error, isLoading: false };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.UPDATE: {
      console.info('library update!');
      const data = Object.assign({}, state.library.data, action.payload);
      const library = { ...state.library, data };
      return Object.assign({}, state, {library});
    }
    case LIBRARY.UPDATE_INDEX_FULFILLED: {
      const data =  { ...state.library.data, ...action.payload };
      const library = { ...state.library, data, isIndexing: false };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.UPDATE_INDEX_PENDING: {
      const library = { ...state.library, error: null, isIndexing: true };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.UPDATE_INDEX_REJECTED: {
      const error = action.payload.message;
      const library = { ...state.library, error, isIndexing: false };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.WRITE_INDEX_FULFILLED: {
      const library = { ...state.library, isWriting: false };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.WRITE_INDEX_PENDING: {
      const library = { ...state.library, error: null, isWriting: true };
      return Object.assign({}, state, { library });
    }
    case LIBRARY.WRITE_INDEX_REJECTED: {
      const error = action.payload.message;
      const library = { ...state.library, error, isWriting: false };
      return Object.assign({}, state, { library });
    }
    case PROFILE.LOAD_PROFILE_FULFILLED: {
      const profile = {...state.profile, data: action.payload, isLoading: false};
      return Object.assign({}, state, {profile});
    }
    case PROFILE.LOAD_PROFILE_PENDING: {
      const profile = {...state.profile, error: null, isLoading: true};
      return Object.assign({}, state, {profile});
    }
    case PROFILE.LOAD_PROFILE_REJECTED: {
      const error = action.payload.message;
      const profile = {...state.profile, error, isLoading: false};
      return Object.assign({}, state, {profile});
    }
    default:
      return state;
  }
}
