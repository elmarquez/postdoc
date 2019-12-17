import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import app from './app';
import library from './library';
import profile from './profile';

/**
 * Create root reducer.
 * @param {*} history - Router history
 * @returns {Reducer}
 */
function createRootReducer(history) {
  return combineReducers({
    app,
    library,
    profile,
    router: connectRouter(history)
  });
}

export { createRootReducer };
