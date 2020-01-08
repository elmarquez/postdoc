import { AgGridReact } from 'ag-grid-react';
import PropTypes from 'prop-types';
import React from 'react';
import DataGrid from '../../datagrid';
import TagEditor from '../../datagrid/editors/tag';
import { Authors, Tag } from '../../datagrid/formatters';
import { Body, ContentPanel } from './styles';
import ErrorBoundary from '../../error-boundary';
import {
  loadIndex,
  updateIndex,
  writeIndex
} from '../../../store/actions/project';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

/**
 * Content editing and viewing panel.
 */
class ContentPanelComponent extends React.Component {
  constructor(props) {
    super(props);
    this.api = null;
    this.columnApi = null;
    this.state = {
      editing: false,
      gridOptions: {
        columnDefs: [
          { field: 'author', headerName: 'Author', cellRenderer: 'authorsFormatter', resizable: true },
          { field: 'title', headerName: 'Title', resizable: true },
          { field: 'year', headerName: 'Year', resizable: true },
          { field: 'type', headerName: 'Type', resizable: true },
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
      }
    };
  }

  onCellEditingStarted(a, b, c) {
    this.setState({ editing: true });
  }

  onCellValueChanged(e) {
    if (this.props.onFileUpdated) {
      this.props.onFileUpdated(e.rowIndex, e.data);
    }
    this.setState({ editing: false });
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
    const { file } = this.props;
    const rows = file.data.records || [];
    return (
      <ContentPanel>
        <Body className="ag-theme-balham">
          <ErrorBoundary>
            <AgGridReact
              frameworkComponents={{
                authorsFormatter: Authors,
                tagEditor: TagEditor,
                tagFormatter: Tag
              }}
              gridOptions={this.state.gridOptions}
              rowData={rows}
            />
          </ErrorBoundary>
        </Body>
      </ContentPanel>
    );
  }
}

ContentPanelComponent.propTypes = {
  file: PropTypes.object.isRequired,
  filter: PropTypes.func,
  onDocumentSelected: PropTypes.func,
  onFileUpdated: PropTypes.func
};

export default ContentPanelComponent;
