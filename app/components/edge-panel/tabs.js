import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TabComponent from './tab';
import { Tabs } from './styles/toolbar';

/**
 * Tabs panel.
 */
class TabsPanelComponent extends Component {
  /**
   * Constructor
   * @param {Object} props - Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      selection: this.props.selection || null
    };
  }

  /**
   * Handle tab click event. Call the onTabClick handler with the record for
   * the selected tab.
   * @param {String} id - Tab identifier
   */
  onTabClick(id) {
    // toggle the selection state
    const selection = id === this.state.selection ? null : id;
    this.setState({ selection });
    // tell the parent component which item we've selected
    if (this.props.onTabClick) {
      const item = this.props.items
        .filter(e => e.title === selection)
        .reduce((obj, e) => e, null);
      this.props.onTabClick(item);
    }
  }

  /**
   * Render the component.
   * @return {JSX.Element}
   */
  render() {
    const items = this.props.items || [];
    let tabs = items.map((panel, key) => {
      return (
        <TabComponent
          icon={panel.icon}
          key={key}
          label={panel.title}
          onClick={id => this.onTabClick(id)}
          selected={this.state.selection === panel.title}
        />
      );
    });
    return <Tabs>{tabs}</Tabs>;
  }
}

TabsPanelComponent.propTypes = {
  items: PropTypes.array,
  onTabClick: PropTypes.func,
  selection: PropTypes.string
};

export default TabsPanelComponent;
