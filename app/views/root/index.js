import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux'
import { HashRouter, Route } from 'react-router-dom';
import { App } from './styles';
import Workspace from './workspace';

// styles
import "antd/dist/antd.css";
import "antd/lib/tabs/style/index.css";

/**
 * Application.
 */
class Application extends React.Component {

    /**
     * Render the component.
     * @returns {JSX.Element}
     */
    render() {
        const { history, store } = this.props; 
        return (
            <Provider store={store}>
                <App className={'App'}>
                    <HashRouter history={history}>
                        <Workspace />
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

export default Application;
