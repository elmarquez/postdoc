import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Body, ContentPanel, Footer, Header } from './styles/content';

/**
 * Content panel component displays a collection of control palettes.
 */
class ContentPanelComponent extends Component {
  /**
   * Constructor
   * @param {Object} props - Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      floating: false,
    };
  }

  /**
   * Toggle floating state.
   */
  onToggleFloating() {
    const floating = !this.state.floating;
    this.setState({ floating });
  }

  /**
   * Render the component.
   * @return {JSX.Element}
   */
  render() {
    if (this.props.content !== null) {
      return (
        <ContentPanel floating={this.state.floating}>
          {this.props.content.panel}
        </ContentPanel>
      );
    } else {
      return <Fragment />;
    }
  }

  /**
   * Render the component body.
   * @return {JSX.Element}
   */
  renderBody() {
    return (
      <Body>{this.props.content.panel}</Body>
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
    } else if (this.props.title !== undefined) {
      return (
        <Header>
          <span className={'title'}>{this.props.title}</span>
        </Header>
      );
    }
  }
}

ContentPanelComponent.propTypes = {
  content: PropTypes.object,
  floating: PropTypes.bool,
  footer: PropTypes.element,
  header: PropTypes.element,
  title: PropTypes.string,
};

export default ContentPanelComponent;
