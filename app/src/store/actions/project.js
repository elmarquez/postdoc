import { PROJECT } from '../types';

/**
 * Add file.
 * @param fp
 * @param data
 * @returns {{data: {path: *}, type: *}}
 */
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

export { addFile, addRecentProject, addTag };
