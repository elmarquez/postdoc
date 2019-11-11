import PropTypes from 'prop-types';
import Select from '@atlaskit/select';
import React from 'react';
import { Container } from '../styles';

/**
 * Custom cell editor to display atlaskit dropdown
 */
export default class MultiSelectEditor extends React.Component {
  /**
   * Class constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.select = React.createRef();
    this.state = {
      value: [],
    };
  }

  /**
   * Used to capture the value of the cell which ag-grid then uses to set
   * the value of the cell once `onCellEditingStopped` is called
   * @return {*}
   */
  getValue() {
    return this.state.value;
  }

  /**
   * Whether the editor should open up as a popup or inside the cell
   * @return {boolean}
   */
  isPopup() {
    return true;
  }

  /**
   * Hook up to this life cycle event to bring select input to focus
   */
  afterGuiAttached() {
    this.select.focus();
  }

  /**
   * Handle select value change event
   * @param {array} data
   */
  onSelectChange(data) {
    let newData = data;
    if (data === null) {
      newData = [];
    }
    this.setState(
      {
        value: newData || [],
      },
      () => {
        if (this.props.stopEditing) {
          this.props.stopEditing();
        }
      }
    );
  }

  /**
   * Render custom select
   * @return {JSX.Element}
   */
  render() {
    return (
      <Container width={this.props.colDef.width}>
        <Select
          ref={(select) => {
            this.select = select;
          }}
          isMulti
          options={this.props.options}
          defaultValue={this.props.defaultValue}
          onChange={(v) => this.onSelectChange(v)}
        />
      </Container>
    );
  }
}

MultiSelectEditor.propTypes = {
  colDef: PropTypes.object,
  options: PropTypes.array.isRequired,
  defaultValue: PropTypes.array.isRequired,
  stopEditing: PropTypes.func,
};

/**
 Example of usage
 this.columnTypes = {
      multiSelect: {
        cellEditor: 'multiSelectEditor',
        cellEditorParams: (params) => {
          return {
            options: PROFICIENCIES,
            defaultValue: params.value || params.data.requiredProficiencies,
          };
        },
        cellRenderer: 'multiSelectEditor',
        cellRendererParams: (params) => {
          return {
            options: PROFICIENCIES,
            defaultValue: params.value || params.data.requiredProficiencies,
          };
        },
        width: 200,
      },
      }
 **/
