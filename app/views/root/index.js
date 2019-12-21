import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux'
import { HashRouter, Route } from 'react-router-dom';
import { FlexColumn, FlexRow } from '../../components/layout';
import DocumentViewer from '../../components/document-viewer';
import GlobalNavigation from '../../components/global-navigation';
import { Panel as Outline } from '../../components/outline-panel';
import StatusBar from '../../components/status-bar';
import { App } from './styles';

// styles
import "antd/dist/antd.css";
import "antd/lib/tabs/style/index.css";

class Application extends React.Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <App className={'App'}>
                    <HashRouter>
                        <FlexRow alignItems={'stretch'} flexGrow={2}>
                            <GlobalNavigation />
                            <Outline />
                            <FlexColumn flexGrow={2}>
                                <DocumentViewer />
                                <StatusBar />
                            </FlexColumn>
                        </FlexRow>                    
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

const mapStateToProps = (state) => {
    return {};
};

export default Application;
