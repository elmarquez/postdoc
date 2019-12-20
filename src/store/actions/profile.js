import shortid from 'shortid';
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
  return function(dispatch) {
    Profile.updateSettings(data).then(function() {
      dispatch({
        type: PROFILE.UPDATE_PROFILE,
        id: shortid.generate(),
        data
      });
    });
  };
}

export { loadProfile, updateProfile };
