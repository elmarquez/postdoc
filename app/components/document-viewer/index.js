import {Layout} from 'antd';
import PropTypes from 'prop-types';
import { equals } from 'ramda';
import React from 'react';
import Placeholder from '../placeholder';
import {FlexColumn, FlexRow} from '../layout';
import TabPanel from '../tabs';
import {Viewer} from './styles';

const {Header, Footer, Sider, Content} = Layout;

/**
 * Document viewer.
 */
class DocumentViewerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      {title: 'Tab 1', content: 'Content of Tab 1', key: '1'},
      {title: 'Tab 2', content: 'Content of Tab 2', key: '2'},
      {
        title: 'Tab 3',
        content: 'Content of Tab 3',
        key: '3',
        closable: false,
      },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }

  add() {
    const {panes} = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({title: 'New Tab', content: 'Content of new Tab', key: activeKey});
    this.setState({panes, activeKey});
  }

  onChange(activeKey) {
    this.setState({activeKey});
  }

  onEdit(targetKey, action) {
    this[action](targetKey);
  }

  remove(targetKey) {
    let {activeKey} = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({panes, activeKey});
  }

  /**
   *
   */
  render() {
    const { project } = this.props;
    return (
      <Viewer>
        {equals(project.data, null) && this.renderPlaceholder()}
        {!equals(project.data, null) && this.renderTabs()}
      </Viewer>
    );
  }

  /**
   * Render the placeholder if a project has not yet been opened.
   * @returns {JSX.Element}
   */
  renderPlaceholder() {
    return (
      <Placeholder>
        <h2>Open a project <span className={'command'}>&#8984;&#8679; O</span></h2>
      </Placeholder>
    );
  }

  /**
   * Render the document tabs.
   * @returns {JSX.Element}
   */
  renderTabs() {
    return <TabPanel/>;
  }
}

DocumentViewerComponent.propTypes = {
  app: PropTypes.object,
  profile: PropTypes.object,
  project: PropTypes.object,
};

export default DocumentViewerComponent;
