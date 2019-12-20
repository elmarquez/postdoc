import PropTypes from 'prop-types';
import React from 'react';

class Application extends React.Component {
    render() {
        return (
            <div>Application root</div>
        );
    }
}

Application.propTypes = {
    history: PropTypes.any,
    store: PropTypes.any,
};

export default Application;
