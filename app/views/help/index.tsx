import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import HelpView from './view';

/**
 * Help view routes.
 * @param {object} props - Component properties
 */
const HelpViewRoutes = (props) => {
  return (
    <Switch>
      <Route path={'/help'} component={HelpView} />
    </Switch>
  );
};

export default HelpViewRoutes;
