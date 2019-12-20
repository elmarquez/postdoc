import React from 'react';
import {
  Accordion,
  Body,
  ChevronIconDown,
  ChevronIconRight,
  Controls,
  Header,
  Title
} from './styles';

/**
 *
 */
class AccordionComponent extends React.Component {
  /**
   * Constructor
   * @param {object} props - Component properties
   */
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }

  /**
   * Toggle collapsed state.
   */
  onToggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  /**
   * Render the component.
   * @returns {JSX.Element}
   */
  render() {
    return (
      <Accordion className="accordion">
        {this.renderHeader()}
        {this.renderBody()}
      </Accordion>
    );
  }

  /**
   * Render the component body.
   * @returns {JSX.Element}
   */
  renderBody() {
    if (!this.state.collapsed) {
      return <Body>{this.props.children}</Body>;
    }
  }

  /**
   * Render the component header.
   * @returns {JSX.Element}
   */
  renderHeader() {
    return (
      <Header onClick={() => this.onToggleCollapse()}>
        {this.renderIcon()}
        <Title>{this.props.title}</Title>
        <Controls>{this.props.controls}</Controls>
      </Header>
    );
  }

  /**
   * Render the collapse toggle icon.
   * @returns {JSX.Element}
   */
  renderIcon() {
    return this.state.collapsed ? <ChevronIconRight /> : <ChevronIconDown />;
  }
}

export default AccordionComponent;
