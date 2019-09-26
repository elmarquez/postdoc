import { APPLICATION, LIBRARY, PROFILE } from "./actionTypes";
import shortid from "shortid";
import Library from "../../lib/library";
import Profile from "../../lib/profile";

/**
 * Delete settings.
 * @param {String} settingId - Setting ID
 * @returns {Object}
 */
function deleteSetting(settingId) {
  return {
    type: APPLICATION.DELETE_SETTING,
    id: shortid.generate(),
  };
}

function loadApplicationState() {
  return function (dispatch) {
    console.info('*** load profile');
    let action = {
      type: PROFILE.LOAD_PROFILE,
      id: shortid.generate(),
      isLoading: true
    };
    dispatch(action);
    Profile
      .getProfile()
      .then(function(data) {
        console.info('*** profile loaded');
        action = {
          type: PROFILE.LOAD_PROFILE,
          id: shortid.generate(),
          data,
          isLoading: false
        };
        dispatch(action);
        action = {
          type: LIBRARY.LOAD_LIBRARY_INDEX,
          id: shortid.generate(),
          isLoading: true
        };
        dispatch(action);
        console.info('*** load library index');
        return Library.loadIndex(data.library);
      })
      .then(function (data) {
        console.info('*** library index loaded');
        action = {
          type: LIBRARY.LOAD_LIBRARY_INDEX,
          id: shortid.generate(),
          isLoading: false,
          data
        };
        dispatch(action);
      });
  };
}

/**
 * Load settings into memory.
 * @returns {Object}
 */
function loadSettings() {
  return {
    type: APPLICATION.LOAD_SETTINGS,
    id: shortid.generate()
  };
}

function resetSettings() {}

/**
 * Persist settings to file storage.
 * @returns {Object}
 */
function saveSettings() {
  return {
    type: APPLICATION.SAVE_SETTINGS,
    id: shortid.generate()
  };
}

/**
 * Add project to recent projects list.
 * @param {Object} data -
 * @returns {Object}
 * FIXME should likely be add recent project?
 */
function updateRecentProjects(data) {
  return {
    type: APPLICATION.UPDATE_RECENT_PROJECTS,
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
    type: APPLICATION.UPDATE_SETTING,
    id: shortid.generate()
  };
}

export {
  deleteSetting,
  loadApplicationState,
  loadSettings,
  resetSettings,
  saveSettings,
  updateRecentProjects,
  updateSetting
};
