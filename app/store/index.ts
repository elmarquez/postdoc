import { createHashHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';
import { createRootReducer } from './reducers';

const history = createHashHistory();
const rootReducer = createRootReducer(history);

var middlewares = [promise];
if (process.env.NODE_ENV === `development`) {
  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error
  });
  middlewares.push(logger);
}

export default createStore(rootReducer, applyMiddleware(...middlewares));
