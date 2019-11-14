import Button from "@atlaskit/button";
import Tag from "@atlaskit/tag";
import TagGroup from "@atlaskit/tag-group";
import {AgGridReact} from 'ag-grid-react';
import PropTypes from "prop-types";
import React from "react";
import CodeMirror from "react-codemirror";
import DataGrid from "../datagrid";
import TagEditor from "../datagrid/editors/tag";
import TagFormatter from "../datagrid/formatters/tag";
import { Body, ContentPanel } from "./styles";
import ErrorBoundary from '../error-boundary';
import {loadIndex, updateIndex, writeIndex} from "../../store/actions/library";

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
          { field: "filename", headerName: "Filename", resizable: true },
          { field: "extension", headerName: "Extension" },
          { field: "lastUpdated", headerName: "Last Updated" },
          {
            cellEditor: 'tagEditor',
            cellRenderer: 'tagFormatter',
            editable: true,
            field: "tags",
            headerName: "Tags",
            resizable: true
          },
          { field: "mimetype", headerName: "Type" },
          { field: "hash", headerName: "Hash" },
          { field: "citation", headerName: "Citation", resizable: true },
          { field: "path", headerName: "Path", resizable: true },
        ],
        onCellEditingStarted: this.onCellEditingStarted.bind(this),
        onCellValueChanged: this.onCellValueChanged.bind(this),
        onRowDoubleClicked: this.onRowDoubleClicked.bind(this),
        pagination: true,
        rowSelection: 'single'
      }
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

  onGridReady (params) {
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
    return (
      <ContentPanel>
        <Body className="ag-theme-balham">
        <ErrorBoundary>
          <AgGridReact
            frameworkComponents={{
              tagEditor: TagEditor,
              tagFormatter: TagFormatter
            }}
            gridOptions={this.state.gridOptions}
            rowData={this.props.files}>
          </AgGridReact>
        </ErrorBoundary>
        </Body>
      </ContentPanel>
    );
  }
}

ContentPanelComponent.propTypes = {
  files: PropTypes.array,
  filter: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  onDocumentSelected: PropTypes.func,
  onFileUpdated: PropTypes.func,
  tags: PropTypes.array,
};

export default ContentPanelComponent;
