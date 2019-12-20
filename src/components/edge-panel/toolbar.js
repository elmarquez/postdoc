import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TabsPanelComponent from './tabs';
import { Body, Footer, Header, Toolbar } from './styles/toolbar';

/**
 * Toolbar panel renders the panel selection control, in addition to providing
 * the ability to add optional controls at the top and bottom of the layout.
 */
class ToolbarComponent extends Component {
  /**
   * Handle panel selection event.
   * @param {Object} item - Item
   */
  onPanelSelection(item) {
    if (this.props.onPanelSelection) {
      this.props.onPanelSelection(item);
    }
  }

  /**
   * Render the component.
   * @return {JSX.Element}
   */
  render() {
    return (
      <Toolbar>
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderFooter()}
      </Toolbar>
    );
  }

  /**
   * Render the component footer.
   * @return {JSX.Element}
   */
  renderBody() {
    return (
      <Body>
        <TabsPanelComponent
          items={this.props.items}
          onTabClick={item => this.onPanelSelection(item)}
          selection={this.props.selection}
        />
      </Body>
    );
  }

  /**
   * Render the component footer.
   * @return {JSX.Element}
   */
  renderFooter() {
    if (this.props.footer !== undefined) {
      return <Footer>{this.props.footer}</Footer>;
    }
  }

  /**
   * Render the component header.
   * @return {JSX.Element}
   */
  renderHeader() {
    if (this.props.header !== undefined) {
      return <Header>{this.props.header}</Header>;
    }
  }
}

ToolbarComponent.propTypes = {
  footer: PropTypes.element,
  header: PropTypes.element,
  items: PropTypes.array,
  onPanelSelection: PropTypes.func,
  selection: PropTypes.string
};

export default ToolbarComponent;
