import Button from "@atlaskit/button";
import {AgGridReact} from 'ag-grid-react';
import PropTypes from "prop-types";
import React from "react";
import CodeMirror from "react-codemirror";
import ReactDataGrid from "react-data-grid";
import TagEditor from "../datagrid/editors/tag";
import TagFormatter from "../datagrid/formatters/tag";
import { Body, ContentPanel } from "./styles";
import ErrorBoundary from '../error-boundary';
import {loadIndex, updateIndex} from "../../store/actions/library";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

/**
 * Content editing and viewing panel.
 */
class ContentPanelComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    }
  }

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

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
              columnDefs={this.state.columnDefs}
              frameworkComponents={{
                tagEditor: TagEditor,
                tagFormatter: TagFormatter
              }}
              pagination={true}
              rowData={this.props.files}>
            </AgGridReact>
          </ErrorBoundary>
        </Body>
      </ContentPanel>
    );
  }

  updateCode(newCode) {
    this.setState({ code: newCode });
  }
}

ContentPanelComponent.propTypes = {
  files: PropTypes.array.isRequired,
  filter: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  tags: PropTypes.array.isRequired,
};

export default ContentPanelComponent;
