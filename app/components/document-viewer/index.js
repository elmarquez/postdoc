import {Layout} from 'antd';
import PropTypes from 'prop-types';
import { equals } from 'ramda';
import React, { Fragment } from 'react';
import Dropzone from 'react-dropzone';

import DocumentEditor from "../document-editor";
import {FlexColumn, FlexRow} from '../layout';
import Placeholder from '../placeholder';
import StatusBar from "../status-bar";
import {Tab, TabList, TabListFiller, TabPane, Tabs, Viewer} from './styles';
import { closeFile, setActiveFile } from '../../store/actions/project';

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
    this.state = {
      dragging: false,
    };
  }

  onChange(a, b, c) {
    console.info('content change', a, b, c);
  }

  onCloseTab(tab) {
    console.info('close tab');
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

  /**
   * Set active tab.
   * @param {object} tab - Tab data
   */
  onTabSelect(tab) {
    this.props.setActiveFile(tab.path);
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

  /**
   * Render the placeholder if no project files have been opened.
   * @returns {JSX.Element}
   */
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
   * Render the tab content.
   * @returns {JSX.Element}
   */
  renderTabContent() {
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
    const { active, files } = this.props.project;
    const tabs = files.map(function (file, key) {
      const classes = active === key ? 'active' : '';
      return (<Tab className={classes} key={key} onClick={() => self.onTabSelect(file)}>{file.filename}</Tab>);
    });
    return (
      <Tabs>
        <TabList>
          {tabs}
          <TabListFiller/>
        </TabList>
        <TabPane>{this.renderTabContent()}</TabPane>
      </Tabs>
    );
  }
}

DocumentViewerComponent.propTypes = {
  app: PropTypes.object,
  profile: PropTypes.object,
  project: PropTypes.object,
};

/**
 * Map data store state to component properties.
 * @param {object} state - Data store state
 * @returns {object}
 */
const mapStateToProps = (state) => {
  return {
    app: state.app,
    profile: state.profile,
    project: state.project,
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

export default DocumentViewerComponent;
