import { APP, LIBRARY, PROFILE } from "../types";
import shortid from "shortid";
import Library from "../../lib/library";
import { loadIndex } from './library';
import Profile from "../../lib/profile";
import {Promise} from 'bluebird';

/**
 * Delete settings.
 * @param {String} settingId - Setting ID
 * @returns {Object}
 */
function deleteSetting(settingId) {
  return {
    type: APP.DELETE_SETTING,
    id: shortid.generate(),
  };
}

/**
 *
 * @returns {Function}
 */
function loadApplicationState() {
  return {
    type: APP.LOAD_APPLICATION_STATE,
    payload: Profile
      .getProfile()
      .then(function (profile) {
        if (profile.library && profile.library !== "") {
          return Library.loadIndex(profile.library).then(function (library) {
            return {profile, library};
          });
        } else {
          return {profile};
        }
      }),
  };
};

/**
 * Load settings into memory.
 * @returns {Object}
 */
function loadSettings() {
  return {
    type: APP.LOAD_SETTINGS,
    id: shortid.generate()
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
    id: shortid.generate()
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
    id: shortid.generate(),
    data
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
    id: shortid.generate()
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
