/* eslint no-unused-vars:0 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProjectView from './view';

/**
 * Project routes.
 */
const ProjectViewRoutes = (props) => {
  return (
    <Switch>
      <Route path="/projects" component={ProjectView} />
    </Switch>
  );
};

export default ProjectViewRoutes;
