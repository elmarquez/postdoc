import PropTypes from 'prop-types';
import Select from '@atlaskit/select';
import React from 'react';
import { Container } from '../styles';

/**
 * Custom cell editor to display atlaskit dropdown
 */
export default class SelectEditor extends React.Component {
  /**
   * Class constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    this.select = React.createRef();
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
   * @param {Object} data
   */
  onSelectChange(data) {
    this.setState(
      {
        value: data.value,
      },
      () => {
        this.props.stopEditing();
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
          options={this.props.values}
          defaultValue={{ label: this.props.value, value: this.props.value }}
          onChange={(v) => this.onSelectChange(v)}
        />
      </Container>
    );
  }
}

SelectEditor.propTypes = {
  colDef: PropTypes.object,
  values: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  stopEditing: PropTypes.func,
};
