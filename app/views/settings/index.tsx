import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import SettingsView from './view';

/**
 * Settings view routes.
 */
const SettingsViewRoutes = (props) => {
  return (
    <Switch>
      <Route path={'/settings'} component={SettingsView} />
    </Switch>
  );
};

export default SettingsViewRoutes;
