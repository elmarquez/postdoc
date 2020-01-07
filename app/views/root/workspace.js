import PropTypes from 'prop-types';
import { equals } from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import DocumentViewer from '../../components/document-viewer';
import GlobalNavigation from '../../components/global-navigation';
import { FlexColumn, FlexRow } from '../../components/layout';
import { Panel as Outline } from '../../components/outline-panel';
import StatusBar from '../../components/status-bar';
import { closeFile, loadIndex, setActiveFile } from '../../store/actions/project';
import { loadProfile } from '../../store/actions/profile';

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
        const { app, closeFile, profile, project, setActiveFile } = this.props;
        return (
            <FlexRow alignItems={'stretch'} flexGrow={2}>
                <Outline profile={1} />
                <DocumentViewer
                  app={app}
                  closeFile={closeFile}
                  profile={profile}
                  project={project}
                  setActiveFile={setActiveFile} />
            </FlexRow>
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
