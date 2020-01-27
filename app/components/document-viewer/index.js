import {Layout} from 'antd';
import PropTypes from 'prop-types';
import { equals } from 'ramda';
import React, { Fragment } from 'react';
import Dropzone from 'react-dropzone';
import ReactResizeDetector from 'react-resize-detector';
import { CheckboxBlankCircle } from 'styled-icons/remix-fill/CheckboxBlankCircle';
import { Close } from 'styled-icons/remix-line/Close';

import MIMETYPES from '../../constants/mimetypes';
import BibliographyEditor from '../bibliography-viewer';
import DocumentEditor from "./document";
import ImageViewer from '../image-viewer';
import {FlexColumn, FlexRow} from '../layout';
import PdfDocumentViewer from '../pdf-viewer';
import Placeholder from '../placeholder';
import {Tab, TabList, TabListFiller, TabPane, Tabs, Viewer} from './styles';

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
    this.state = {};
  }

  onChange(a, b, c) {
    console.info('content change', a, b, c);
  }

  /**
   * Close file.
   * @param {object} doc - Document metadata
   */
  onTabClose(doc) {
    // TODO ensure that the file has been saved before closing it
    this.props.closeFile(doc.path);
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
    return (<Viewer>{this.renderDocumentViewer()}</Viewer>);
  }

  /**
   * Render the document viewer panel.
   * @returns {JSX.Element}
   */
  renderDocumentViewer() {
    const { files, project } = this.props;
    if (equals(project.path, null)) {
      return this.renderProjectPlaceholder();
    } else if (files.files.length === 0) {
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
    // TODO show the list of recent files
    // TODO add an option to create a new file
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
    // TODO show the list of recent projects
    // TODO add an option to create a new project
    return (
      <Placeholder>
        <h2>Open a project <span className={'command'}>&#8984;&#8679; O</span></h2>
      </Placeholder>
    );
  }

  /**
   * Render document tab.
   * @param {object} doc - Document metadata
   * @param {string} key - Element key
   * @param {string} active - Key of the active document tab
   * @returns {JSX.Element}
   */
  renderTab(doc, key, active) {
    const classes = active === key ? 'active' : '';
    return (
      <Tab className={classes} key={key} onClick={() => this.onTabSelect(doc)}>
        <span className={'title'}>{doc.filename}</span>
        <span className={'close icon'} onClick={() => this.onTabClose(doc)}><Close /></span>
        <span className={'status icon'}><CheckboxBlankCircle /></span>
      </Tab>
    );
  }


  /**
   * Render the tab content.
   * @param {object} size - Parent element width, height
   * @returns {JSX.Element}
   */
  renderTabContent(size) {
    const { active, files } = this.props.files;
    const file = files[active];
    const { mimetype } = file.type;
    switch(mimetype) {
      case MIMETYPES.BIBJSON.mimetype:
        return (<BibliographyEditor file={file} />);
      case MIMETYPES.BIBTEX.mimetype:
        return (<BibliographyEditor file={file} />);
      case MIMETYPES.GIF.mimetype:
      case MIMETYPES.JPEG.mimetype:
      case MIMETYPES.PNG.mimetype:
      case MIMETYPES.WEBP.mimetype:
        return (<ImageViewer data={file} />);
      case MIMETYPES.PDF.mimetype:
        return (<PdfDocumentViewer data={file} />);
      default:
        return (
          <DocumentEditor
            data={file.data}
            onChange={this.onChange.bind(this)}
            size={size}
            type={mimetype} />
        );
    }
  }

  /**
   * Render document tabs.
   * @returns {JSX.Element}
   */
  renderTabs() {
    const self = this;
    const { active, files } = this.props.files;
    const tabs = files.map((file, key) => this.renderTab(file, key, active));
    return (
      <Tabs>
        <TabList>
          {tabs}
          <TabListFiller/>
        </TabList>
        <TabPane>
          <ReactResizeDetector>
            {(size) => this.renderTabContent(size)}
          </ReactResizeDetector>
        </TabPane>
      </Tabs>
    );
  }
}

DocumentViewerComponent.propTypes = {
  app: PropTypes.object.isRequired,
  closeFile: PropTypes.func.isRequired,
  files: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  setActiveFile: PropTypes.func.isRequired,
};

export default DocumentViewerComponent;
