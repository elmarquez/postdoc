import {basename} from 'path';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { closeFile, setActiveFile } from '../../store/actions/project';
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
   * Set active tab.
   * @param {object} tab - Tab data
   */
  onTabSelect(tab) {
    this.props.setActiveFile(tab.path);
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
    const { active, files } = this.props.project;
    const tab = files[active];
    return (<DocumentEditor data={tab.data} onChange={this.onChange.bind(this)}/>);
  }

  /**
   * Render the tabs.
   * @returns {JSX.Element}
   */
  renderTabs() {
    const self = this;
    const tabs = self.props.tabs.map(function (tab, key) {
      const name = basename(tab.path);
      const classes = self.props.project.active === key ? 'active' : '';
      return (<Tab className={classes} key={key} onClick={() => self.onTabSelect(tab)}>{name}</Tab>);
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

/**
 * Map data store state to component properties.
 * @param {object} state - Data store state
 * @returns {object}
 */
const mapStateToProps = state => {
  return {
    project: state.project
  };
};

/**
 * Map data store dispatch functions to component properties.
 * @param {Function} dispatch - Redux dispatch function
 * @return {Object} Map of functions to be assigned to the component props
 */
const mapDispatchToProps = {
  closeFile,
  setActiveFile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabPanelComponent);
