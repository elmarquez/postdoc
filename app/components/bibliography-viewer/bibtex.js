import { AgGridReact } from 'ag-grid-react';
import PropTypes from 'prop-types';
import React from 'react';
import TagEditor from '../datagrid/editors/tag';
import {Authors, Tag} from '../datagrid/formatters';

/**
 * Bibtex bibliography viewer and editor.
 */
class BibtexBibliographyViewer extends React.Component {
  /**
   * Constructor
   * @param {object} props - Component properties
   */
  constructor(props) {
    super(props);
    this.api = null;
    this.columnApi = null;
    this.state = {
      editing: false,
      gridOptions: {
        columnDefs: [
          {field: 'key', headerName: 'Key', resizable: true},
          {field: 'entryType', headerName: 'Type', resizable: true},
          {field: 'data.Author', headerName: 'Author', resizable: true},
          {field: 'data.Title', headerName: 'Title', resizable: true},
          {field: 'data.Year', headerName: 'Year', resizable: true},
          {
            cellEditor: 'tagEditor',
            cellRenderer: 'tagFormatter',
            editable: true,
            field: 'tags',
            headerName: 'Tags',
            resizable: true
          },
        ],
        isDragging: false,
        onCellEditingStarted: this.onCellEditingStarted.bind(this),
        onCellValueChanged: this.onCellValueChanged.bind(this),
        onRowDoubleClicked: this.onRowDoubleClicked.bind(this),
        pagination: true,
        rowSelection: 'single'
      },
      imports: []
    };
  }

  componentDidMount() {
    console.info('file at mount', this.props.file);
  }

  componentDidUpdate(prevProps) {
    if (!equals(prevProps)) {
      console.info('file at update', this.props.file);
    }
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

  /**
   * Render the component.
   * @returns {XML}
   */
  render() {
    const {file} = this.props;
    console.info('file', file);
    const rows = file.data || [];
    return (
      <AgGridReact
        frameworkComponents={{
          tagEditor: TagEditor,
          tagFormatter: Tag
        }}
        gridOptions={this.state.gridOptions}
        rowData={rows}
      />
    );
  }
}

BibtexBibliographyViewer.propTypes = {
  file: PropTypes.object.isRequired,
  filter: PropTypes.func,
  onDocumentSelected: PropTypes.func,
  onFileUpdated: PropTypes.func
};

export default BibtexBibliographyViewer;
