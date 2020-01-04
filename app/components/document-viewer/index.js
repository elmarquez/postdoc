import {Layout} from 'antd';
import PropTypes from 'prop-types';
import { equals } from 'ramda';
import React, { Fragment } from 'react';
import Dropzone from 'react-dropzone';
import Placeholder from '../placeholder';
import {FlexColumn, FlexRow} from '../layout';
import TabPanel from '../tabs';
import {Viewer} from './styles';
import StatusBar from "../status-bar";

const {Header, Footer, Sider, Content} = Layout;

/**
 * Document viewer.
 */
class DocumentViewerComponent extends React.Component {

  /**
   * Constructor
   * @param {object} props - Component properties
   */
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
      dragging: false,
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

  onDragEnter() {
    this.setState({ dragging: true });
  }

  onDragLeave() {
    this.setState({ dragging: false });
  }

  onDrop() {
    this.setState({ dragging: false });
  }

  onEdit(targetKey, action) {
    this[action](targetKey);
  }

  remove(targetKey) {
    const { active } = this.state;
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
   * Render the component.
   * @return {JSX.Element}
   */
  render() {
    const { app, profile, project} = this.props;
    return (
      <FlexColumn flexGrow={2}>
        <Viewer>
          {this.renderDocumentViewer()}
        </Viewer>
        <StatusBar app={app} profile={profile} project={project} />
      </FlexColumn>
    );
  }

  /**
   * Render the document viewer panel.
   * @returns {JSX.Element}
   */
  renderDocumentViewer() {
    const { project } = this.props;
    if (equals(project.path, null)) {
      return this.renderProjectPlaceholder();
    } else if (project.files.length === 0) {
      return this.renderFilesPlaceholder();
    } else {
      return this.renderTabs();
    }
  }

  renderFilesPlaceholder() {
    return (
      <Placeholder>
        <h2>Open a file <span className={'command'}>&#8984; O</span></h2>
      </Placeholder>
    );
  }

  /**
   * Render the placeholder if a project has not yet been opened.
   * @returns {JSX.Element}
   */
  renderProjectPlaceholder() {
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
    const { active, files } = this.props.project;
    return (
      <TabPanel active={active} tabs={files} />
    );
  }
}

DocumentViewerComponent.propTypes = {
  app: PropTypes.object,
  profile: PropTypes.object,
  project: PropTypes.object,
};

export default DocumentViewerComponent;
