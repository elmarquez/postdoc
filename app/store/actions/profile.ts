import { PROFILE } from '../types';
import shortid from 'shortid';
import Profile from '../../lib/profile';

/**
 * Load profile into memory.
 * @returns {Object}
 */
const loadProfile = () => {
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
const updateProfile = (data) => {
  return function(dispatch) {
    Profile.updateProfileSettings(data).then(function() {
      dispatch({
        type: PROFILE.UPDATE_PROFILE,
        id: shortid.generate(),
        data
      });
    });
  };
}

export { loadProfile, updateProfile };
