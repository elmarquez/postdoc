import { CustomNoRowsOverlay } from '/components/data-grid/cell-renderers/index';
import { AgGridReact } from 'ag-grid-react';
import { PropTypes } from 'prop-types';
import React from 'react';
import STRINGS from '../../constants/strings';
import { ADDED_ROW, EDITED_ROW, INVALID_ROW } from '../..//constants/ui';
import { DataGridWrapper } from './styles';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


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
      pagination: true,
      paginationAutoPageSize: true,
      rowClassRules: {
        'invalid-row': `data.rowStatus === '${INVALID_ROW}'`,
      },
      rowSelection: 'single',
      stopEditingWhenGridLosesFocus: true,
      suppressFocusAfterRefresh: true,
    };
  }

  /**
   * Handle cell value changed event
   * @param {Object} params
   */
  onCellValueChanged(params) {
    if (params.data.rowStatus === ADDED_ROW) {
      return;
    }
    // bubble up the event only when an actual change was made to the data
    if (String(params.oldValue) !== String(params.newValue)) {
      const dataWithUpdatedState = params.data;
      dataWithUpdatedState.rowStatus = EDITED_ROW;
      params.api.updateRowData({ update: [dataWithUpdatedState] });
    }
  }

  /**
   * Handle AgGrid lifecycle event
   * @param {Object} params - Grid params
   */
  onGridReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

  /**
   * Handle on row double clicked event.
   * @param {Event} e - Event
   */
  onRowDoubleClicked(e) {
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
    const columns = this.props.columns || [];
    let frameworkComponents = this.props.frameworkComponents || {};
    frameworkComponents = Object.assign(frameworkComponents, {
      customNoRowsOverlay: CustomNoRowsOverlay,
    });
    const rows = this.props.rows || [];
    const defaultColDef = this.props.defaultColDef || {};
    const columnTypes = this.props.columnTypes || {};
    const classes = ['ag-theme-balham', this.props.className].join(' ');
    const noRowsOverlayComponentParams = {
      noRowsMessage: () => {
        return STRINGS.NO_DATA;
      },
      autoWidth: !this.props.domLayout,
    };
    return (
      <DataGridWrapper className={classes}>
        <AgGridReact
          columnDefs={columns}
          columnTypes={columnTypes}
          defaultColDef={defaultColDef}
          domLayout={this.props.domLayout ? this.props.domLayout : 'normal'}
          frameworkComponents={frameworkComponents}
          gridOptions={this.gridOptions}
          noRowsOverlayComponent='customNoRowsOverlay'
          noRowsOverlayComponentParams={noRowsOverlayComponentParams}
          onGridReady={this.onGridReady}
          paginationAutoPageSize={!paginationPageSize}
          paginationPageSize={paginationPageSize}
          rowData={rows}
          stopEditingWhenGridLosesFocus={true}
        />
      </DataGridWrapper>
    );
  }
}

DataGrid.propTypes = {
  columns: PropTypes.array.isRequired,
  columnTypes: PropTypes.object,
  defaultColDef: PropTypes.object,
  domLayout: PropTypes.string,
  frameworkComponents: PropTypes.object,
  isLoading: PropTypes.bool,
  onGridEdited: PropTypes.func,
  onRowDoubleClicked: PropTypes.func,
  paginationPageSize: PropTypes.number,
  rows: PropTypes.array.isRequired,
};

export default DataGrid;
