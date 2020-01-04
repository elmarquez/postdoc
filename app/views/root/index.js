import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import React, {Context} from 'react';
import {connect, Provider} from 'react-redux'
import {HashRouter, Route} from 'react-router-dom';
import {createFile, loadIndex, openFile, openProject, updateIndex} from '../../store/actions/project';
import { APP, PROJECT } from '../../store/types';
import {App} from './styles';
import Workspace from './workspace';

const { dialog } = require('electron').remote;

// styles
import "antd/dist/antd.css";
import "antd/lib/tabs/style/index.css";

/**
 * Application.
 */
class Application extends React.Component {

  /**
   * Handle component lifecycle event.
   */
  componentDidMount() {
    // handle application menu bar actions
    ipcRenderer.on(APP.SHOW_ABOUT, (e, msg) => console.info('show about'));
    ipcRenderer.on(APP.SHOW_PREFERENCES, (e, msg) => console.info('show preferences'));
    ipcRenderer.on(PROJECT.CREATE_FILE, (e, msg) => this.onCreateFile());
    ipcRenderer.on(PROJECT.CREATE_PROJECT, (e, msg) => this.onCreateProject());
    ipcRenderer.on(PROJECT.OPEN_FILE, (e, msg) => this.onOpenFile());
    ipcRenderer.on(PROJECT.OPEN_PROJECT, (e, msg) => this.onOpenProject());
  }

  /**
   *
   */
  onCreateFile() {
    this.props.createFile();
  }

  /**
   *
   */
  onCreateProject() {
    console.info('create project')
    const options = {
      buttonLabel: 'Open',
      createDirectory: true,
      properties: ['createDirectory', 'openDirectory', 'promptToCreate'],
      title: 'Create project'
    };
    const path = dialog.showOpenDialogSync(options);
  }

  /**
   *
   */
  onOpenFile() {
    const self = this;
    const options = {
      buttonLabel: 'Open',
      properties: ['openFile'],
      title: 'Open file'
    };
    dialog
      .showOpenDialog(options)
      .then(function(result) {
        const { cancelled, filePaths } = result;
        if (!cancelled) {
          self.props.openFile(filePaths.pop());
        }
      })
      .catch(function(err) {
        console.error(err);
      });
  }

  /**
   *
   */
  onOpenProject() {
    const self = this;
    const options = {
      buttonLabel: 'Open',
      properties: ['createDirectory', 'openDirectory', 'promptToCreate'],
      title: 'Open project'
    };
    dialog
      .showOpenDialog(options)
      .then(function(result) {
        const { cancelled, filePaths } = result;
        if (!cancelled) {
          self.props.openProject(filePaths.pop());
        }
      })
      .catch(function(err) {
        console.error(err);
      });
  }

  /**
   * Render the component.
   * @returns {JSX.Element}
   */
  render() {
    const {history, store} = this.props;
    return (
      <Provider store={store}>
        <App className={'App'}>
          <HashRouter history={history}>
            <Workspace/>
          </HashRouter>
        </App>
      </Provider>
    );
  }
}

Application.propTypes = {
  history: PropTypes.any,
  store: PropTypes.any,
};


/**
 * Map data store state to component properties.
 * @param {object} state - Data store state
 * @returns {object}
 */
const mapStateToProps = state => {
  return {
    application: state.application,
    profile: state.profile,
    project: state.project
  };
};

/**
 * Map data store dispatch functions to component properties.
 * @param {Function} dispatch - Redux dispatch function
 * @return {Object} Map of functions to be assigned to the component props
 */
const mapDispatchToProps = {
  createFile,
  loadIndex,
  openFile,
  openProject,
  updateIndex
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);
