import { AgGridReact } from 'ag-grid-react';
import { PropTypes } from 'prop-types';
import React from 'react';
import STRINGS from '../../constants/strings';
import { DataGridWrapper } from './styles';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const DEFAULT_FRAMEWORK_COMPONENTS = {};

/**
 * Data grid componnet.
 */
class DataGrid extends React.PureComponent {
  /**
   * Constructor
   * @param {Object} props - Component properties
   */
  constructor(props) {
    super(props);
    this.onGridReady = this.onGridReady.bind(this);
    this.onCellValueChanged = this.onCellValueChanged.bind(this);
    this.onRowDoubleClicked = this.onRowDoubleClicked.bind(this);
    this.api = null;
    this.columnApi = null;
    this.gridOptions = {
      onCellEditingStarted: this.onCellEditingStarted,
      onCellValueChanged: this.onCellValueChanged,
      onRowDoubleClicked: this.onRowDoubleClicked,
      // pagination: true,
      // paginationAutoPageSize: true,
      rowSelection: 'single'
      // stopEditingWhenGridLosesFocus: true,
      // suppressFocusAfterRefresh: true,
    };
    this.state = { rows: [] };
  }

  componentDidMount() {
    this.setState({ rows: this.props.rows || [] });
  }

  componentDidUpdate(a, b) {
    console.info('component did update', a, b);
  }

  getFrameworkComponents() {
    let frameworkComponents = this.props.frameworkComponents || {};
    return Object.assign({}, frameworkComponents);
  }

  /**
   * Handle cell value changed event
   * @param {Object} params
   */
  onCellValueChanged(params) {
    console.info('cell value changed', params);
    if (this.props.onCellValueChanged) {
      this.props.onCellValueChanged(params);
    }
  }

  /**
   * Handle AgGrid lifecycle event
   * @param {Object} params - Grid params
   */
  onGridReady(params) {
    console.info('grid ready', params);
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

  /**
   * Handle on row double clicked event.
   * @param {Event} e - Event
   */
  onRowDoubleClicked(e) {
    console.info('row double clicked', e);
    if (this.props.onRowDoubleClicked) {
      this.props.onRowDoubleClicked(e);
    }
  }

  /**
   * Render the component.
   * @return {JSX.Element}
   */
  render() {
    const { isLoading, paginationPageSize } = this.props;
    let frameworkComponents = this.getFrameworkComponents();
    const rows = this.props.rows || [];
    const classes = ['ag-theme-balham', this.props.className].join(' ');
    return (
      <AgGridReact
        className={classes}
        // domLayout={this.props.domLayout ? this.props.domLayout : 'normal'}
        frameworkComponents={frameworkComponents}
        gridOptions={this.props.gridOptions}
        // noRowsOverlayComponent='customNoRowsOverlay'
        // noRowsOverlayComponentParams={noRowsOverlayComponentParams}
        // onCellValueChanged={(e) => this.onCellValueChanged(e)}
        onGridReady={e => this.onGridReady(e)}
        onRowDoubleClicked={e => this.onRowDoubleClicked(e)}
        paginationAutoPageSize={!paginationPageSize}
        paginationPageSize={paginationPageSize}
        rowData={rows}
        // stopEditingWhenGridLosesFocus={true}
      />
    );
  }
}

DataGrid.propTypes = {
  domLayout: PropTypes.string,
  frameworkComponents: PropTypes.object,
  gridOptions: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  onCellValueChanged: PropTypes.func,
  onGridEdited: PropTypes.func,
  onRowDoubleClicked: PropTypes.func,
  paginationPageSize: PropTypes.number,
  rows: PropTypes.array
};

export default DataGrid;
