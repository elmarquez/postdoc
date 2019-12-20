import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './old-containers/App';
import HomePage from './old-containers/HomePage';
import CounterPage from './old-containers/CounterPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
