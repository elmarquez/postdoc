import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import LibraryView from './view';

/**
 * Library routes.
 * @param {object} props - Component properties
 */
const LibraryViewRoutes = (props) => {
  return (
    <Switch>
      <Route path={'/library'} component={LibraryView} />
    </Switch>
  );
};

export default LibraryViewRoutes;
