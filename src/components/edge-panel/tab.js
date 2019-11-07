import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Tab } from './styles/toolbar';

/**
 * Tab control toggles the selection state of the toolbar. The appearance of
 * the tab changes when it is in a 'selected' state.
 * TODO consider adding an accelerator key binding
 */
class TabComponent extends Component {
  /**
   * Handle tab click.
   */
  onClick() {
    if (this.props.onClick !== null) {
      this.props.onClick(this.props.label);
    }
  }

  /**
   * Render the component.
   * @return {JSX.Element}
   */
  render() {
    const className = this.props.selected === true ? 'selected' : '';
    return (
      <Tab className={className} onClick={() => this.onClick()}>
        {this.renderIcon()}
        {this.props.label}
      </Tab>
    );
  }

  /**
   * Render icon.
   * @return {JSX.Element}
   */
  renderIcon() {
    if (this.props.icon !== null) {
      return <span className={'icon'}>{this.props.icon}</span>;
    }
  }
}

TabComponent.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string,
  selected: PropTypes.bool,
};

export default TabComponent;
