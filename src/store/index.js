import { applyMiddleware, createStore } from "redux";
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export default createStore(rootReducer, applyMiddleware(logger, promise));
