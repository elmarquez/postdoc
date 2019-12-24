import { PROFILE } from '../types';
import Profile from '../../lib/profile';

/**
 * Load profile into memory.
 * @returns {Object}
 */
function loadProfile() {
  return {
    type: PROFILE.LOAD_PROFILE,
    payload: Profile.getProfile()
  };
}

/**
 * Update profile.
 * @param {Object} data - Profile data
 * @returns {Object}
 */
function updateProfile(data) {
  return {
    type: PROFILE.UPDATE_PROFILE,
    payload: Profile.updateSettings(data)
  };
}

export { loadProfile, updateProfile };
