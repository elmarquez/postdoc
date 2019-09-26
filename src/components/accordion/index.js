import React from 'react';
import {Accordion, Body, ChevronIcon, Controls, Header, Title} from './styles';


class AccordionComponent extends React.Component {
  render() {
    return (
      <Accordion className={'accordion'}>
        {this.renderHeader()}
        {this.renderBody()}
      </Accordion>
    );
  }

  renderBody() {
    return (
      <Body>{this.props.children}</Body>
    );
  }

  renderHeader() {
    return (
      <Header>
        <ChevronIcon />
        <Title>{this.props.title}</Title>
        <Controls>{this.props.controls}</Controls>
      </Header>
    );
  }
}

export default AccordionComponent;
