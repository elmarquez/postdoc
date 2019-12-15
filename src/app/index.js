import '@atlaskit/css-reset';
import Promise from 'bluebird';
import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import GlobalNavigationBar from '../components/global-navigation/index';
import OutlinePanel from '../components/outline-panel/index';
import StatusBar from '../components/status-bar/index';
import { Library, Menu, Profile, Project } from '../lib/index';
import { loadApplicationState } from '../store/actions/application';
import { loadIndex } from '../store/actions/library';
import { loadProfile } from '../store/actions/profile';
import GlobalStyles from '../styles/global';
import LibraryRoutes from '../views/library/index';
import ProjectsRoutes from '../views/project/index';
import HelpRoutes from '../views/help/index';
import HomeRoutes from '../views/home/index';
import SettingsRoutes from '../views/settings/index';
import { View, Workspace } from './styles/index';
import FileDialog from '../components/modals/file';

/**
 * Application layout.
 */
class AppComponent extends React.Component {
  /**
   * Constructor
   * @param {Object} props - Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      indexing: false,
      panels: {
        git: true,
        project: true,
        statusbar: true
      },
      window: null
    };
  }

  /**
   * Handle lifecycle event.
   */
  componentDidMount() {
    const self = this;
    // setup the application window
    const window = {};
    // dispatch data loading events
    self.props.loadProfile();
    // set window state
    self.setState({ window });
  }

  onUpdateIndex() {
    const self = this;
    if (self.state.indexing === false) {
      const { project } = this.state;
      self.setState({ indexing: true });
      Project.updateIndex(project)
        .then(files => {
          self.setState({ files, indexing: false });
        })
        .catch(err => {
          // FIXME show error message
          console.error(err);
        });
    }
  }

  /**
   * Render the component.
   * @returns {XML}
   */
  render() {
    return (
      <React.Fragment>
        <GlobalStyles />
        <FileDialog />
        <HashRouter>
          <AnimatedSwitch
            atActive={{ opacity: 1 }}
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            className="switch-wrapper"
          >
            <Workspace>
              <GlobalNavigationBar />
              {this.renderView()}
            </Workspace>
            <StatusBar
              project={this.state.project}
              visible={this.state.panels.statusbar}
            />
          </AnimatedSwitch>
        </HashRouter>
      </React.Fragment>
    );
  }

  renderView() {
    return (
      <View>
        <Switch>
          <Route path="/home" component={HomeRoutes} exact={true} />
          <Route path="/help" component={HelpRoutes} />
          <Route path="/library" component={LibraryRoutes} />
          <Route path="/projects" component={ProjectsRoutes} />
          <Route path="/settings" component={SettingsRoutes} />
          <Redirect to="/home" />
        </Switch>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    application: state.application,
    library: state.library,
    profile: state.profile,
    project: state.project
  };
};

/**
 * Map data store dispatch functions to component properties.
 * @param {Function} dispatch - Redux dispatch function
 * @return {Object} Map of functions to be assigned to the component props
 */
const mapDispatchToProps = dispatch => ({
  loadApplicationState: () => dispatch(loadApplicationState()),
  loadProfile: () => dispatch(loadProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
