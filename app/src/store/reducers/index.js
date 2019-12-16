import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';

import app from './app';
import library from './library';
import profile from './profile';

/**
 * Create root reducer.
 * @param {History} history - Router history
 * @returns {Reducer}
 */
function createRootReducer(history: History) {
  return combineReducers({
    app,
    library,
    profile,
    router: connectRouter(history)
  });
}

export { createRootReducer };
