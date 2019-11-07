import PropTypes from 'prop-types';
import React from 'react';
import Item from './item';
import Accordion from '../accordion';
import {FlexColumn, FlexRow} from '../layout';
import {Collection, Controls, Title} from './styles/collection';

/**
 * Outline group component.
 */
class CollectionComponent extends React.Component {
  /**
   * Render the component.
   * @returns {JSX.Element}
   */
  render() {
    const self = this;
    const items = self.props.items.map(function (item, key) {
      return (<Item {...item} key={key} />);
    });
    return (
      <Accordion className={'accordion collection'} title={this.props.title}>
        <FlexColumn>{items}</FlexColumn>
      </Accordion>
    );
  }
}

CollectionComponent.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

export default CollectionComponent;
