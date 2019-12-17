import { routerMiddleware, routerActions } from 'connected-react-router';
import { createHashHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';

import actions from './actions';
import { createRootReducer } from './reducers';

const history = createHashHistory();
const rootReducer = createRootReducer(history);

const _module: any = module;
const _window: any = window;

const configureStore = (initialState?: any) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Promise Middleware
  middleware.push(promise);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...actions,
    ...routerActions
  };

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = _window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? _window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://extension.remotedev.io/docs/API/Arguments.html
        actionCreators
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);

  if (_module.hot) {
    _module.hot.accept(
      '../reducers', // eslint-disable-next-line global-require
      () => store.replaceReducer(require('./reducers').default)
    );
  }

  return store;
};

export default { configureStore, history };
