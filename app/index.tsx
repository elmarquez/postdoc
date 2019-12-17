import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './views/app';
import store from './store';

/**
 * Application
 * @param {object} props - Component properties
 * @constructor
 */
const Application = (props) => (
  <Provider store={store}>
    <App />
  </Provider>
);

render(<Application />, document.getElementById('root'));
