import * as antd from 'antd';
import {AgGridReact} from 'ag-grid-react';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDataGrid from 'react-data-grid';
import Dropzone from 'react-dropzone';

import * as bib from '../../../lib/bibliography';
import files from '../../../lib/utils/files';
import TagEditor from '../../datagrid/editors/tag';
import {Authors, Tag} from '../../datagrid/formatters';
import {Body, ContentPanel} from './styles';
import ErrorBoundary from '../../error-boundary';
import {
  loadIndex,
  updateIndex,
  writeIndex
} from '../../../store/actions/project';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const { Button, Form, Modal, Select } = antd;
const { Option } = Select;

const AuthorsFormatter2 = (props) => {
  const authors = props.value.map((item) => item.name).join(', ');
  return <span>{authors}</span>;
}

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
      columns: [
        { key: 'author', name: 'Author', formatter: AuthorsFormatter2 },
        { key: 'title', name: 'Title' },
        { key: 'year', name: 'Year' },
        { key: 'type', name: 'Type' },
        { key: 'tags', name: 'Tags' },
      ],
      editing: false,
      gridOptions: {
        columnDefs: [
          {field: 'author', headerName: 'Author', cellRenderer: 'authorsFormatter', resizable: true},
          {field: 'title', headerName: 'Title', resizable: true},
          {field: 'year', headerName: 'Year', resizable: true},
          {field: 'type', headerName: 'Type', resizable: true},
          {
            cellEditor: 'tagEditor',
            cellRenderer: 'tagFormatter',
            editable: true,
            field: 'tags',
            headerName: 'Tags',
            resizable: true
          },
        ],
        onCellEditingStarted: this.onCellEditingStarted.bind(this),
        onCellValueChanged: this.onCellValueChanged.bind(this),
        onRowDoubleClicked: this.onRowDoubleClicked.bind(this),
        pagination: true,
        rowSelection: 'single'
      },
      imports: [],
      showImportModal: false
    };
  }

  onCellEditingStarted(a, b, c) {
    this.setState({editing: true});
  }

  onCellValueChanged(e) {
    if (this.props.onFileUpdated) {
      this.props.onFileUpdated(e.rowIndex, e.data);
    }
    this.setState({editing: false});
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

  onDragEnter() {
    console.info('drag enter');
  }

  onDragLeave() {
    console.info('drag leave');
  }

  /**
   *
   * @param files
   */
  onDrop(files) {
    this.onShowImportModal(files);
  }

  onGridReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

  /**
   * Handle row double clicked.
   * @param {Object} row - Data grid row
   */
  onRowDoubleClicked(row) {
    if (this.state.editing === false && this.props.onDocumentSelected) {
      this.props.onDocumentSelected(row.data);
    }
  }

  onShowImportModal(files) {
    this.setState({ imports: files, showImportModal: true });
  }

  /**
   * Render the component.
   * @returns {XML}
   */
  render() {
    return (
      <ContentPanel>
        <Body className="ag-theme-balham"
              onDragEnter={this.onDragEnter.bind(this)}
              onDragLeave={this.onDragLeave.bind(this)}>
          <ErrorBoundary>
            <Dropzone onDrop={this.onDrop.bind(this)}>
              {({getRootProps, getInputProps}) => (
                <div {...getRootProps({className: 'dropzone'})}>
                  <input {...getInputProps()} />
                  {this.renderDataGrid()}
                </div>
              )}
            </Dropzone>
          </ErrorBoundary>
        </Body>
        {this.renderModals()}
      </ContentPanel>
    );
  }

  renderAgGrid() {
    const {file} = this.props;
    const rows = file.data.records || [];
    return (
      <AgGridReact
        frameworkComponents={{
          authorsFormatter: Authors,
          tagEditor: TagEditor,
          tagFormatter: Tag
        }}
        gridOptions={this.state.gridOptions}
        rowData={rows}
      />
    );
  }

  renderDataGrid() {
    const {file} = this.props;
    const rows = file.data.records || [];
    return (
      <ReactDataGrid
        columns={this.state.columns}
        enableDragAndDrop
        enableRowSelect
        minHeight={150}
        rowGetter={i => rows[i]}
        rowsCount={rows.length}
      />
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
