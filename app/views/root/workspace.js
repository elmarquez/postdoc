import PropTypes from 'prop-types';
import {equals} from 'ramda';
import React from 'react';
import {connect} from 'react-redux';
import SplitterLayout from 'react-splitter-layout';

import DocumentViewer from '../../components/document-viewer';
import GlobalNavigation from '../../components/global-navigation';
import {FlexColumn, FlexRow} from '../../components/layout';
import {Panel as Outline} from '../../components/outline-panel';
import StatusBar from '../../components/status-bar';
import { closeFile, setActiveFile } from '../../store/actions/files';
import { loadIndex } from '../../store/actions/project';
import {loadProfile} from '../../store/actions/profile';

/**
 * Workspace layout.
 */
class WorkspaceComponent extends React.Component {
  /**
   * Handle componentDidMount lifecycle event.
   */
  componentDidMount() {
    this.props.loadProfile();
  }

  /**
   * Handle componentDidUpdate lifecycle event.
   * @param {object} prevProps - Previous component properties
   */
  componentDidUpdate(prevProps) {}

  /**
   * Render the component.
   * @returns {JSX.Element}
   */
  render() {
    const {app, closeFile, files, profile, project, setActiveFile} = this.props;
    return (
      <FlexColumn flexGrow={2}>
        <SplitterLayout primaryIndex={1} secondaryInitialSize={240}>
          <Outline profile={1} />
          <DocumentViewer
            app={app}
            closeFile={closeFile}
            files={files}
            profile={profile}
            project={project}
            setActiveFile={setActiveFile} />
        </SplitterLayout>
        <StatusBar app={app} profile={profile} project={project}/>
      </FlexColumn>
    );
  }
}

WorkspaceComponent.propTypes = {
  app: PropTypes.object.isRequired,
  files: PropTypes.object.isRequired,
  loadProfile: PropTypes.func,
  profile: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};

/**
 * Map dispatch functions to component properties.
 * @returns {object}
 */
const mapDispatchToProps = {
  closeFile,
  loadIndex,
  loadProfile,
  setActiveFile
};

/**
 * Map store state to component properties.
 * @param {object} state - Store state
 * @returns {object}
 */
const mapStateToProps = (state) => {
  return {
    app: state.app,
    files: state.files,
    profile: state.profile,
    project: state.project,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceComponent);
