import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LibraryView from './view';

/**
 * Library routes.
 */
class LibraryViewRoutes extends React.Component {
  /**
   * Render the component.
   * @returns {JSX.Element}
   */
  render() {
    return (
      <Switch>
        <Route path={'/library'} component={LibraryView} />
      </Switch>
    );
  }
}

export default LibraryViewRoutes;
