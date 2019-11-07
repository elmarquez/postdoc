import PropTypes from 'prop-types';
import React from 'react';
import { AlertTriangle } from 'styled-icons/feather';
import { Image, Body, Placeholder, Title } from './styles';

// some predefined placeholder icons
const ICONS = {
  ALERT_TRIANGLE: AlertTriangle,
};

/**
 * Placeholder component displays a message and an optional icon.
 */
class PlaceholderComponent extends React.Component {
  /**
   * Render the component.
   * @return {JSX.Element}
   */
  render() {
    return (
      <Placeholder>
        {this.renderImage()}
        {this.renderTitle()}
        {this.renderBody()}
      </Placeholder>
    );
  }

  /**
   * Render the body.
   * @return {JSX.Element}
   */
  renderBody() {
    return <Body>{this.props.children || this.props.message || 'Resource Not Found'}</Body>;
  }

  /**
   * Render the placeholder image.
   * @return {JSX.Element}
   */
  renderImage() {
    if (this.props.image !== undefined) {
      return (
        <Image>
          <AlertTriangle />
        </Image>
      );
      // return (<Image>{this.props.image}</Image>);
    }
  }

  /**
   * Render the title.
   * @return {JSX.Element}
   */
  renderTitle() {
    if (this.props.title !== undefined) {
      return <h2>{this.props.title}</h2>;
    }
  }
}

PlaceholderComponent.propTypes = {
  // image: PropTypes.array,
  message: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default PlaceholderComponent;

export { ICONS };
