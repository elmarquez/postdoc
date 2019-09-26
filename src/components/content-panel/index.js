import Button from "@atlaskit/button";
import {AgGridReact} from 'ag-grid-react';
import PropTypes from "prop-types";
import React from "react";
import CodeMirror from "react-codemirror";
import ReactDataGrid from "react-data-grid";
import { connect } from "react-redux";
import { Body, ContentPanel } from "./styles";
import {loadIndex, updateIndex} from "../../store/actions/library";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const columns = [
  { key: "hash", name: "Hash" },
  { key: "path", name: "Path" },
  { key: "tags", name: "Tags", editable: true }
];

/**
 * Content editing and viewing panel.
 */
class ContentPanelComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "// this is a test",
      mode: "markdown",
      columnDefs: [
        {headerName: "Path", field: "path"},
        {headerName: "Hash", field: "hash"},
        {headerName: "Tags", field: "tags"}
      ],
      readOnly: false
    }
  }

  onClick() {
    if (this.props.onUpdateIndex !== undefined) {
      this.props.onUpdateIndex();
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
    console.info("render contents panel", this.props.files);
    return (
      <ContentPanel>
        <Body className="ag-theme-balham">
          {/*{this.renderEditor()}*/}
          <Button onClick={() => this.onClick()}>Start indexing</Button>
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.props.library.files}>
          </AgGridReact>
        </Body>
      </ContentPanel>
    );
  }

  /**
   * Render the editing panel.
   * @returns {XML}
   */
  renderEditor() {
    var options = {
      lineNumbers: true
    };
    return (
      <CodeMirror
        className={"editor"}
        onChange={this.updateCode.bind(this)}
        options={options}
        ref="editor"
        value={this.state.code}
      />
    );
  }

  renderFile(f, key) {
    return (
      <div className={"file"} key={key}>
        {f.path}
      </div>
    );
  }

  renderFiles() {
    const self = this;
    return (
      <ReactDataGrid
        columns={columns}
        enableCellSelect={true}
        onGridRowsUpdated={e => self.onGridRowsUpdated(e)}
        rowGetter={i => self.state.rows[i]}
        rowsCount={3}
      />
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
  application: PropTypes.object.isRequired,
  library: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    application: state.application,
    library: state.library,
    profile: state.profile,
    project: state.project
  };
};

/**
 * Map data store dispatch functions to component properties.
 * @param {Function} dispatch - Redux dispatch function
 * @return {Object} Map of functions to be assigned to the component props
 */
const mapDispatchToProps = dispatch => ({
  loadIndex: (fp) => dispatch(loadIndex(fp)),
  updateIndex: (fp) => dispatch(updateIndex(fp))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentPanelComponent);
