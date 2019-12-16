import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { DatePicker } from '@atlaskit/datetime-picker';
import { Container } from '../styles';
import DATES from '../../../constants/dates';

/**
 * Cell Renderer for Date type column inside a grid view
 */
class DateCellEditor extends React.Component {
  /**
   * Constructor for DateCellRenderer
   * @param {Object} props - Props from parent component
   */
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      isOpen: false
    };
    this.datePicker = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.parseInputValue = this.parseInputValue.bind(this);
    this.onContainerRef = this.onContainerRef.bind(this);
  }

  /**
   * Whether the editor should open up as a popup or inside the cell
   * @return {boolean}
   */
  isPopup() {
    return true;
  }

  /**
   * Actions to perform once the custom editor is attached to our grid
   */
  afterGuiAttached() {
    this.setState({
      isOpen: true
    });
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
   * Handler for `onChange` event for Date picker
   * @param {String} date
   */
  onChange(date) {
    if (moment(date, DATES.BACKEND_DATE_FORMAT).isValid()) {
      this.setState(
        {
          value: moment(date).format(DATES.BACKEND_DATE_FORMAT),
          isOpen: false
        },
        () => {
          this.props.stopEditing();
        }
      );
    }
  }

  /**
   * Setting reference to datepicker DOM element
   * @param {Object} node - DOM element
   */
  onContainerRef(node) {
    if (node) {
      this.datePicker = node;
    }
  }

  /**
   * Parse the input to date.
   * @param {string} date
   * @param {string} dateFormat
   * @return {Date}
   */
  parseInputValue(date, dateFormat) {
    return moment(date, dateFormat).toDate();
  }

  /**
   * Handle React `render` lifecycle event
   * @return {JSX.Element}
   */
  render() {
    const value = this.props.value
      ? moment(this.props.value).format(DATES.BACKEND_DATE_FORMAT)
      : moment().format(DATES.BACKEND_DATE_FORMAT);
    return (
      <Container width={this.props.colDef.width}>
        <DatePicker
          ref={this.onContainerRef}
          autoFocus={true}
          id={'gridDatePicker'}
          dateFormat={DATES.BACKEND_DATE_FORMAT}
          parseInputValue={this.parseInputValue}
          value={value}
          onChange={this.onChange}
          isOpen={this.state.isOpen}
        />
      </Container>
    );
  }
}

DateCellEditor.propTypes = {
  colDef: PropTypes.object,
  value: PropTypes.string,
  stopEditing: PropTypes.func
};

export default DateCellEditor;
