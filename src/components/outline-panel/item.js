import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import {Item, Icon, Label} from './styles/collection';

/**
 * Collection item.
 */
class CollectionItemComponent extends React.Component {
  /**
   * Render the component.
   * @returns {JSX.Element}
   */
  render() {
    if (this.props.path) {
      return (
        <Link className={'item'} to={this.props.path}>
          <Icon>{this.props.icon}</Icon>
          <Label>{this.props.label}</Label>
        </Link>
      );
    } else {
      return (
        <Item>
          <Icon>{this.props.icon}</Icon>
          <Label>{this.props.label}</Label>
        </Item>
      );
    }
  }
}

CollectionItemComponent.propTypes = {
  label: PropTypes.string.isRequired
};

export default CollectionItemComponent;
