import { APP } from '../types';
import shortid from 'shortid';
import Library from '../../lib/library';
import Profile from '../../lib/profile';

/**
 * Delete settings.
 * @param {String} settingId - Setting ID
 * @returns {Object}
 */
const deleteSetting = (settingId) => {
  return {
    type: APP.DELETE_SETTING,
    id: shortid.generate()
  };
};

/**
 *
 * @returns {Function}
 */
const loadApplicationState = () => {
  return {
    type: APP.LOAD_APPLICATION_STATE,
    payload: Profile.getProfile().then(function(profile) {
      if (profile.library && profile.library !== '') {
        return Library.loadIndex(profile.library).then(function(library) {
          return { profile, library };
        });
      } else {
        return { profile };
      }
    })
  };
};

/**
 * Load settings into memory.
 * @returns {Object}
 */
const loadSettings = () => {
  return {
    type: APP.LOAD_SETTINGS,
    id: shortid.generate()
  };
};

/**
 *
 */
const resetSettings = () => {};

/**
 * Persist settings to file storage.
 * @returns {Object}
 */
const saveSettings = () => {
  return {
    type: APP.SAVE_SETTINGS,
    id: shortid.generate()
  };
};

const showModal = () => {
  return {};
};

/**
 * Add project to recent projects list.
 * @param {Object} data -
 * @returns {Object}
 * FIXME should likely be add recent project?
 */
const updateRecentProjects = (data) => {
  return {
    type: APP.UPDATE_RECENT_PROJECTS,
    id: shortid.generate(),
    data
  };
};

/**
 * Update application setting.
 * @param {String} settingId - Setting ID
 * @param {Object} data - Data
 * @returns {Object}
 */
const updateSetting = (settingId, data) => {
  return {
    type: APP.UPDATE_SETTING,
    id: shortid.generate()
  };
};

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
