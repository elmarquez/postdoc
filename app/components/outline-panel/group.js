import PropTypes from 'prop-types';
import React from 'react';
import Item from './item';
import { FlexColumn, FlexRow } from '../layout';
import { Controls, Group, Title } from './styles';

class GroupComponent extends React.Component {
  /**
   * Render the component.
   * @returns {JSX.Element}
   */
  render() {
    return (
      <Group>
        <FlexRow padding="0 0 16px 0">
          <Title>{this.props.title}</Title>
          <Controls>&nbsp;</Controls>
        </FlexRow>
        <FlexColumn>{this.props.children}</FlexColumn>
      </Group>
    );
  }
}

GroupComponent.propTypes = {
  title: PropTypes.string.isRequired
};

export default GroupComponent;
