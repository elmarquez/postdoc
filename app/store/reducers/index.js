import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import app from './app';
import files from './files';
import profile from './profile';
import project from './project';

/**
 * Create root reducer.
 * @param {object} history 
 */
const createRootReducer = (history) => {
  return combineReducers({
    app,
    files,
    profile,
    project,
    router: connectRouter(history),
  });
}

export {
  createRootReducer
};
