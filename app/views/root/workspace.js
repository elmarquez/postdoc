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
import { loadFileTree, loadIndex } from '../../store/actions/project';
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
    componentDidUpdate(prevProps) {
        if (!equals(this.props, prevProps)) {
            if (!equals(this.props.profile.data, prevProps.profile.data)) {
                const { data } = this.props.profile;
                if (data.library !== null) {
                    this.props.loadFileTree(data.library);
                }
            }
        }
    }

    /**
     * Render the component.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <FlexRow alignItems={'stretch'} flexGrow={2}>
                <GlobalNavigation />
                <Outline profile={1} />
                <FlexColumn flexGrow={2}>
                    <DocumentViewer />
                    <StatusBar />
                </FlexColumn>
            </FlexRow>
        );
    }
}

WorkspaceComponent.propTypes = {
    app: PropTypes.object,
    library: PropTypes.object,
    loadFileTree: PropTypes.func,
    loadProfile: PropTypes.func,
    profile: PropTypes.object,
    project: PropTypes.object,
};

/**
 * Map dispatch functions to component properties.
 * @returns {object}
 */
const mapDispatchToProps = {
    loadFileTree,
    loadIndex,
    loadProfile
};

/**
 * Map store state to component properties.
 * @param {object} state - Store state
 * @returns {object} 
 */
const mapStateToProps = (state) => {
    return {
        app: state.app,
        library: state.library,
        profile: state.profile,
        project: state.project,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceComponent);
