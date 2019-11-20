import { PROJECT } from "../types";

const PROJECT = {
  ADD_FILE: "ADD_PROJECT_FILE",
  ADD_RECENT_PROJECT: "ADD_RECENT_PROJECT",
  ADD_TAG: "ADD_PROJECT_TAG",
  CLONE_PROJECT: "CLONE_PROJECT",
  CREATE_PROJECT: "CREATE_PROJECT",
  DELETE_FILE: "DELETE_PROJECT_FILE",
  DELETE_PROJECT: "DELETE_PROJECT",
  DELETE_TAG: "DELETE_PROJECT_TAG",
  LOAD_PROJECT: "LOAD_PROJECT",
  REMOVE_RECENT_PROJECT: "REMOVE_RECENT_PROJECT",
  UPDATE_FILE: "UPDATE_PROJECT_FILE",
  UPDATE_INDEX: "UPDATE_PROJECT_INDEX",
  UPDATE_TAG: "UPDATE_PROJECT_TAG"
};

function addFile(fp, data) {
  return {
    type: PROJECT.ADD_RECENT_PROJECT,
    data: {
      path: fp
    }
  };
}

/**
 * Add project to recent projects list.
 * @param fp
 * @returns {Object}
 */
function addRecentProject(fp) {
  return {
    type: PROJECT.ADD_RECENT_PROJECT,
    data: {
      path: fp
    }
  };
}

function addTag(fp, data) {}

/**
 * Create new project.
 * @param {Object} data - Project configuration
 * @returns {Object}
 */
function createProject(data) {
  return {
    type: PROJECT.CREATE_PROJECT,
    data
  };
}

/**
 * Delete project from file system.
 * @param {String} fp - Project path
 * @returns {Object}
 */
function deleteProject(fp) {
  return {
    type: PROJECT.DELETE_PROJECT,
    data: {
      path: fp
    }
  };
}

/**
 * Load project index and settings into memory.
 * @param {String} fp - Project path
 * @returns {Object}
 */
function loadProject(fp) {
  return {
    type: PROJECT.LOAD_PROJECT,
    data: {
      path: fp
    }
  };
}

/**
 * Remove project from recent projects list.
 * @param {String} fp - Project path
 * @returns {Object}
 */
function removeRecentProject(fp) {
  return {
    type: PROJECT.REMOVE_RECENT_PROJECT,
    data: {
      path: fp
    }
  };
}

function updateScenario(id, data) {
  return {
    type: SCENARIOS.UPDATE_SCENARIO,
    data: {
      id,
      data
    }
  };
}

export { createScenario, deleteScenario, updateScenario };
