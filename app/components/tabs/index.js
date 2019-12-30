import {basename} from 'path';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {Tab, Tabs, TabPane, TabList, TabListFiller,} from './styles';
import DocumentEditor from '../document-editor';

/**
 * Tab panel.
 */
class TabPanelComponent extends React.Component {
  onChange(e, data) {
    console.info('on change', e, data);
  }

  /**
   * Render the component.
   * @returns {JSX.Element}
   */
  render() {
    return (
      <Tabs>
        <TabList>
          {this.renderTabs()}
          <TabListFiller/>
        </TabList>
        <TabPane>
          {this.renderContent()}
        </TabPane>
      </Tabs>
    );
  }

  /**
   * Render the tab content.
   * @returns {JSX.Element}
   */
  renderContent() {
    const { active, tabs } = this.props;
    const tab = tabs[active];
    return (<DocumentEditor data={tab.data} onChange={this.onChange.bind(this)}/>);
  }

  /**
   * Render the tabs.
   * @returns {JSX.Element}
   */
  renderTabs() {
    const tabs = this.props.tabs.map(function (tab, key) {
      const name = basename(tab.path);
      return (<Tab key={key}>{name}</Tab>);
    });
    return (
      <Fragment>{tabs}</Fragment>
    );
  }
}

TabPanelComponent.propTypes = {
  selected: PropTypes.number,
  tabs: PropTypes.array
};

export default TabPanelComponent;
