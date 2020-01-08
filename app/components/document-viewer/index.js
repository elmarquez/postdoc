import {Layout} from 'antd';
import PropTypes from 'prop-types';
import { equals } from 'ramda';
import React, { Fragment } from 'react';
import Dropzone from 'react-dropzone';
import { CheckboxBlankCircle } from 'styled-icons/remix-fill/CheckboxBlankCircle';
import { Close } from 'styled-icons/remix-line/Close';

import MIMETYPES from '../../constants/mimetypes';
import BibliographyEditor from './bibliography';
import DocumentEditor from "./document";
import ImageViewer from './image';
import {FlexColumn, FlexRow} from '../layout';
import PdfDocumentViewer from './pdf';
import Placeholder from '../placeholder';
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
   * Close tab.
   * @param {Event} e - Click event
   * @param {object} doc - Document metadata
   */
  onTabClose(e, doc) {
    e.preventDefault();
    e.stopPropagation();
    console.info('close tab', doc);
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
        return (<DocumentEditor data={file.data} onChange={this.onChange.bind(this)} type={mimetype}/>);
    }
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
        <span className={'close icon'} onClick={(e) => this.onTabClose(e, doc)}><Close /></span>
        <span className={'status icon'}><CheckboxBlankCircle /></span>
      </Tab>
    );
  }

  /**
   * Render document tabs.
   * @returns {JSX.Element}
   */
  renderTabs() {
    const self = this;
    const { active, files } = this.props.project;
    const tabs = files.map((file, key) => this.renderTab(file, key, active));
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
  closeFile: PropTypes.func,
  profile: PropTypes.object,
  project: PropTypes.object,
  setActiveFile: PropTypes.func,
};

export default DocumentViewerComponent;
