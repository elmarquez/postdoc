import PropTypes from 'prop-types';
import React from 'react';
import {FlexColumn, FlexRow} from '../layout';
import {Group, Controls, Title} from './styles';

class GroupComponent extends React.Component {
  render() {
    return (
      <Group>
        {this.renderHeader()}
        {this.renderBody()}
      </Group>
    );
  }

  renderHeader() {
    return (
      <FlexRow padding={'0 0 8px 0'}>
        <Title>{this.props.title}</Title>
        <Controls>Controls</Controls>
      </FlexRow>
    );
  }

  renderBody() {
    return (
      <FlexColumn>{this.props.children}</FlexColumn>
    );

  }
}

GroupComponent.propTypes = {
  title: PropTypes.string.isRequired
};

export default GroupComponent;
