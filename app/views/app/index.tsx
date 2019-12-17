import '@atlaskit/css-reset';
import * as React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import GlobalNavigationBar from '../../components/global-navigation';
import StatusBar from '../../components/status-bar';
import { Project } from '../../lib';
import { loadApplicationState } from '../../store/actions/application';
import { loadProfile } from '../../store/actions/profile';
import GlobalStyles from '../../styles/global';
import LibraryRoutes from '../library';
import ProjectsRoutes from '../project';
import HelpRoutes from '../help';
import HomeRoutes from '../home';
import SettingsRoutes from '../settings';
import { View, Workspace } from './styles';
import FileDialog from '../../components/modals/file';

export interface AppProps {
  application: Object,
  library: Object,
  loadApplicationState: Function,
  loadProfile: Function,
  profile: Object,
  project: Object
};

export interface AppState {
  files: Array<any>,
  indexing: Boolean,
  panels: {
    git: Boolean,
    project: Boolean,
    statusbar: Boolean
  },
  project: any,
  window: any
}

/**
 * Application layout.
 */
class AppComponent extends React.Component<AppProps, AppState> {
  /**
   * Constructor
   * @param {Props} props - Component properties
   */
  constructor(props: AppProps) {
    super(props);
    this.state = {
      files: [],
      indexing: false,
      panels: {
        git: true,
        project: true,
        statusbar: true
      },
      project: null,
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
    if (this.state.indexing === false) {
      const { project } = this.state;
      this.setState({ indexing: true });
      Project.updateIndex(project)
        .then(files => {
          this.setState({ files, indexing: false });
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

/**
 * Map data store state to component properties.
 * @param {object} state - Store state
 */
const mapStateToProps = (state) => {
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
const mapDispatchToProps = (dispatch) => ({
  loadApplicationState: () => dispatch(loadApplicationState()),
  loadProfile: () => dispatch(loadProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
