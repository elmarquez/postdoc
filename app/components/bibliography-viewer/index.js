import * as antd from 'antd';
import {AgGridReact} from 'ag-grid-react';
import PropTypes from 'prop-types';
import { equals } from 'ramda';
import React from 'react';
import ReactDataGrid from 'react-data-grid';
import Dropzone from 'react-dropzone';

import Placeholder from '../placeholder';
import * as bib from '../../lib/bibliography';
import files from '../../lib/utils/files';
import TagEditor from '../datagrid/editors/tag';
import {Authors, Tag} from '../datagrid/formatters';
import {Body, ContentPanel} from './styles';
import ErrorBoundary from '../error-boundary';
import BibtexEditor from './bibtex';
import {
  loadIndex,
  updateIndex,
  writeIndex
} from '../../store/actions/project';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const { Button, Form, Modal, Select } = antd;
const { Option } = Select;


/**
 * Content editing and viewing panel.
 */
class BibliographyEditorComponent extends React.Component {
  /**
   * Constructor
   * @param {object} props - Component properties
   */
  constructor(props) {
    super(props);
    this.api = null;
    this.columnApi = null;
    this.state = {
      imports: [],
      isDragging: false,
      showImportModal: false
    };
  }

  onCloseImportModal() {
    const self = this;
    const { imports } = self.state;
    files
      .readFile(imports[0].path, 'utf8')
      .then(function (data) {
        const resources = bib.getObjectFromBibtex(data);
        console.info(resources);
        self.setState({ imports:[], showImportModal: false });
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  /**
   * Handle drag enter.
   * @param {Event} e - Drag event
   */
  onDragEnter() {
    this.setState({ isDragging: true });
  }

  /**
   * Handle drag exit.
   * @param {Event} e - Drag event
   */
  onDragExit() {
    this.setState({ isDragging: false });
  }

  /**
   * Handle drag leave.
   * @param {Event} e - Drag event
   */
  onDragLeave() {
    this.setState({ isDragging: false });
  }

  /**
   * Handle drag over event.
   * @param {Event} e - Drag event
   */
  onDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * Handle file drop.
   * @param {Event} e - Event
   */
  onDrop(e) {
    e.preventDefault();
    let files = [];
    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          let file = e.dataTransfer.items[i].getAsFile();
          files.push(file);
        }
      }
    } else {
      files = e.dataTransfer.files;
    }
    this.setState({ isDragging: false });
    this.onShowImportModal(files);
  }

  onShowImportModal(files) {
    this.setState({ imports: files, showImportModal: true });
  }

  /**
   * Render the component.
   * @returns {XML}
   */
  render() {
    console.info('file', this.props.file);
    const { isDragging } = this.state;
    return (
      <ContentPanel>
        <Body className="ag-theme-balham"
              onDragEnter={this.onDragEnter.bind(this)}
              onDragExit={this.onDragExit.bind(this)}
              onDragLeave={this.onDragLeave.bind(this)}
              onDragOver={this.onDragOver.bind(this)}
              onDrop={this.onDrop.bind(this)}
        >
          <ErrorBoundary>
            {isDragging && this.renderFileDropzone()}
            {!isDragging && this.renderBibliography()}
          </ErrorBoundary>
        </Body>
        {this.renderModals()}
      </ContentPanel>
    );
  }

  renderBibliography() {
    const {file} = this.props;
    const rows = file.data.records || [];
    if (file.type.mimetype === "application/x-bibtex") {
      return (<BibtexEditor file={file} />);
    } else if (file.type.mimetype === 'application/vnd.citationstyles.style+xml') {
      return (<div>CSL bibliography file format</div>);
    } else if (file.type.mimetype === 'application/x-bibjson') {
      return (<div>BibJson bibliography file format</div>);
    } else {
      return (<div>Bibliography format not supported</div>);
    }
  }

  /**
   * Render file drag-drop zone.
   * @returns {JSX.Element}
   */
  renderFileDropzone() {
    return (
      <Placeholder>
        <h2>Drop BibTex, RIS or JSON bibliography files here to import</h2>
      </Placeholder>
    );
  }

  renderModals() {
    const { imports } = this.state;
    return (
      <React.Fragment>
        <Modal
          okText={imports.length > 1 ? 'Import Files' : 'Import File'}
          onCancel={this.onCloseImportModal.bind(this)}
          onOk={this.onCloseImportModal.bind(this)}
          title="Import Bibliography"
          visible={this.state.showImportModal}
        >
          <p>Select bibliography format to import</p>
          <Select defaultValue="bibtex" style={{ width: 120 }} onChange={(e) => console.info('select change', e)}>
            <Option value="bibtex">BibTeX</Option>
            <Option value="bibjson">BibJSON</Option>
            <Option value="csljson">CSL-JSON</Option>
            <Option value="endnote">EndNote</Option>
            <Option value="marc">MARC</Option>
            <Option value="ris">RIS</Option>
          </Select>
        </Modal>
      </React.Fragment>
    );
  }
}

BibliographyEditorComponent.propTypes = {
  file: PropTypes.object.isRequired,
  filter: PropTypes.func,
  onDocumentSelected: PropTypes.func,
  onFileUpdated: PropTypes.func
};

export default BibliographyEditorComponent;
