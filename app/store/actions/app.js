import { Promise } from 'bluebird';
import { APP } from '../types';
import Profile from '../../lib/profile';

/**
 * Delete settings.
 * @param {String} settingId - Setting ID
 * @returns {Object}
 */
function deleteSetting(settingId) {
  return {
    type: APP.DELETE_SETTING,
    payload: Promise.resolve()
  };
}

/**
 *
 * @returns {Function}
 */
function loadApplicationState() {
  return {
    type: APP.LOAD_APPLICATION_STATE,
    payload: Profile.getProfile()
  };
}

/**
 * Load settings into memory.
 * @returns {Object}
 */
function loadSettings() {
  return {
    type: APP.LOAD_SETTINGS,
    payload: Promise.resolve()
  };
}

/**
 *
 */
function resetSettings() {}

/**
 * Persist settings to file storage.
 * @returns {Object}
 */
function saveSettings() {
  return {
    type: APP.SAVE_SETTINGS,
    payload: Promise.resolve()
  };
}

function showModal() {
  return {};
}

/**
 * Add project to recent projects list.
 * @param {Object} data -
 * @returns {Object}
 * FIXME should likely be add recent project?
 */
function updateRecentProjects(data) {
  return {
    type: APP.UPDATE_RECENT_PROJECTS,
    payload: Promise.resolve()
  };
}

/**
 * Update application setting.
 * @param {String} settingId - Setting ID
 * @param {Object} data - Data
 * @returns {Object}
 */
function updateSetting(settingId, data) {
  return {
    type: APP.UPDATE_SETTING,
    payload: Promise.resolve()
  };
}

export {
  deleteSetting,
  loadApplicationState,
  loadSettings,
  resetSettings,
  saveSettings,
  showModal,
  updateRecentProjects,
  updateSetting
};
