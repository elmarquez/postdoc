import os from 'os';
import path from 'path';
import utils from '../utils';

const DEFAULT_PROFILE_SETTINGS = {
  library: '/Users/dmarques/Documents/Research',
  recent: []
};
const PROFILE_FOLDER_NAME = '.postdoc';
const PROFILE_SETTINGS_FILENAME = 'settings.json';

/**
 * Ensure that the minimum user profile setup exists.
 * @param {String} d - Profile directory
 * @returns {Promise}
 */
function ensureProfile(d) {
  return ensureProfileDirectory(d).then(function() {
    return ensureProfileSettings(d);
  });
}

/**
 * Ensure that the profile directory exists.
 * @param {String} d - Profile directory
 * @return {Promise}
 */
function ensureProfileDirectory(d) {
  return utils.files.exists(d).then(function(exists) {
    if (!exists) {
      console.debug('Creating settings directory', d);
      return utils.files.ensureDir(d);
    }
  });
}

/**
 * Ensure that the profile settings file exists.
 * @param {String} d - Profile directory
 * @return {Promise}
 */
function ensureProfileSettings(d) {
  const settings = path.join(d, PROFILE_SETTINGS_FILENAME);
  return utils.files.exists(settings).then(function(exists) {
    if (!exists) {
      console.debug('Creating settings file', settings);
      return utils.files.ensureFile(settings, DEFAULT_PROFILE_SETTINGS);
    }
  });
}

/**
 * Read the user profile.
 * @returns {Promise<Object>}
 */
function getProfile() {
  const profile = getProfileDirectoryPath();
  return ensureProfile(profile).then(function() {
    const settings = path.join(profile, PROFILE_SETTINGS_FILENAME);
    console.debug('Reading profile from', settings);
    return utils.files.readJSON(settings);
  });
}

/**
 * Get the profile directory path.
 * @return {String} absolute directory path
 */
function getProfileDirectoryPath() {
  const home = os.homedir();
  return path.join(home, PROFILE_FOLDER_NAME);
}

/**
 * Update profile settings.
 * @param {Object} data - Settings
 * @returns {Promise}
 */
function updateProfileSettings(data) {
  const parent = getProfileDirectoryPath();
  const settings = path.join(parent, PROFILE_SETTINGS_FILENAME);
  return utils.files.writeJSON(settings, data);
}

export default {
  ensureProfile,
  ensureProfileDirectory,
  ensureProfileSettings,
  getProfile,
  getProfileDirectoryPath,
  updateProfileSettings
};
