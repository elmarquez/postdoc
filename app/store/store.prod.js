import { routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import { createRootReducer } from './reducers';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(promise, router);

function configureStore(initialState) {
  console.info('creating production store configuration');
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
