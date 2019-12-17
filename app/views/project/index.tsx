import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProjectView from './view';

/**
 * Project view routes.
 * @param {object} props - Component properties
 */
const ProjectViewRoutes = (props) => {
  return (
    <Switch>
      <Route path={'/projects'} component={ProjectView} />
    </Switch>
  );
};

export default ProjectViewRoutes;
