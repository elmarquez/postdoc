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
import {closeFile, loadIndex, setActiveFile} from '../../store/actions/project';
import {loadProfile} from '../../store/actions/profile';
import {Body} from "../../components/document-viewer/bibliography/styles";

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
  componentDidUpdate(prevProps) {
  }

  onPaneSizeChanged(size) {
    console.info('pane size changed', size);
  }

  /**
   * Render the component.
   * @returns {JSX.Element}
   */
  render() {
    const {app, closeFile, profile, project, setActiveFile} = this.props;
    return (
      <FlexColumn flexGrow={2}>
        <SplitterLayout primaryIndex={1} secondaryInitialSize={240}>
          <Outline profile={1} />
          <DocumentViewer
            app={app}
            closeFile={closeFile}
            profile={profile}
            project={project}
            setActiveFile={setActiveFile}/>
        </SplitterLayout>
        <StatusBar app={app} profile={profile} project={project}/>
      </FlexColumn>
    );
  }
}

WorkspaceComponent.propTypes = {
  app: PropTypes.object,
  library: PropTypes.object,
  loadProfile: PropTypes.func,
  profile: PropTypes.object,
  project: PropTypes.object,
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
    profile: state.profile,
    project: state.project,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceComponent);
