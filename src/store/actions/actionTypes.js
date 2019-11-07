const APPLICATION = {
  DELETE_SETTING: "DELETE_SETTING",
  GET_SETTING: "GET_SETTING",
  GET_RECENT_PROJECTS: "GET_RECENT_PROJECTS",
  LOAD_APPLICATION_STATE: 'LOAD_APPLICATION_STATE',
  LOAD_APPLICATION_STATE_FULFILLED: 'LOAD_APPLICATION_STATE_FULFILLED',
  LOAD_APPLICATION_STATE_PENDING: 'LOAD_APPLICATION_STATE_PENDING',
  LOAD_APPLICATION_STATE_REJECTED: 'LOAD_APPLICATION_STATE_REJECTED',
  SAVE_SETTINGS: "SAVE_SETTINGS",
  UPDATE_SETTING: "UPDATE_SETTING",
  UPDATE_RECENT_PROJECTS: "UPDATE_RECENT_PROJECTS"
};

const LIBRARY = {
  ADD_FILE: "ADD_FILE",
  ADD_TAG: "ADD_TAG",
  DELETE_FILE: "DELETE_FILE",
  DELETE_TAG: "DELETE_TAG",
  GET_FILES: "GET_FILES",
  GET_TAGS: "GET_TAGS",
  LOAD_LIBRARY_INDEX: "LOAD_LIBRARY_INDEX",
  UPDATE_FILE: "UPDATE_FILE",
  UPDATE_INDEX: "UPDATE_INDEX",
  UPDATE_TAG: "UPDATE_TAG"
};

const PROFILE = {
  LOAD_PROFILE: "LOAD_PROFILE",
  UPDATE_PROFILE: "UPDATE_PROFILE"
};

const PROJECT = {
  ADD_FILE: "ADD_FILE",
  ADD_TAG: "ADD_TAG",
  CLONE_PROJECT: "CLONE_PROJECT",
  CREATE_PROJECT: "CREATE_PROJECT",
  DELETE_FILE: "DELETE_FILE",
  DELETE_TAG: "DELETE_TAG",
  GET_FILES: "GET_FILES",
  GET_TAGS: "GET_TAGS",
  UPDATE_FILE: "UPDATE_FILE",
  UPDATE_TAG: "UPDATE_TAG"
};

export { APPLICATION, LIBRARY, PROFILE, PROJECT };