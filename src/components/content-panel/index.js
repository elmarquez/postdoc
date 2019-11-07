import Button from "@atlaskit/button";
import {AgGridReact} from 'ag-grid-react';
import PropTypes from "prop-types";
import React from "react";
import CodeMirror from "react-codemirror";
import ReactDataGrid from "react-data-grid";
import { MultiSelectEditor, TagGroupEditor, TextEditor } from "../datagrid/cell-editors";
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
        // { field: "extension", headerName: "Extension" },
        // { field: "mimetype", headerName: "MimeType" },
        // { field: "lastUpdated", headerName: "Last Updated" },
        // { field: "hash", headerName: "Hash" },
        { field: "citation", headerName: "Citation", resizable: true },
        // { field: "path", headerName: "Path", resizable: true },
        { field: "tags", headerName: "Tags", resizable: true }
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
    console.info('render console panenl', this.props);
    return (
      <ContentPanel>
        <Body className="ag-theme-balham">
          <ErrorBoundary>
            <AgGridReact
              columnDefs={this.state.columnDefs}
              frameworkComponents={{
                multiSelectEditor: MultiSelectEditor,
                tagGroupEditor: TagGroupEditor
              }}
              pagination={true}
              rowData={this.props.files}>
            </AgGridReact>
          </ErrorBoundary>
        </Body>
      </ContentPanel>
    );
  }

  renderHeader() {
    return (
      <div className={"header"}>
        <div className={"tabs"}>
          <div className={"tab"}>filename1.md</div>
          <div className={"tab"}>filename2.md</div>
          <div className={"tab"}>filename3.md</div>
          <div className={"tab"}>filename4.md</div>
          <div className={"tab"}>filename5.md</div>
        </div>
      </div>
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
