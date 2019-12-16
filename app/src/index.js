import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import * as serviceWorker from './serviceWorker';
import store from './store';

const Application = props => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Application />, document.getElementById('root'));
