import React from 'react';
import { clone } from 'ramda';
import { InputContainer } from '../styles';

const KEY = {
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  ARROW_LEFT: 37,
  BACKSPACE: 8,
  DELETE: 46,
  F2: 113
};

// TODO: Grab these defaults from a constants file
const DEFAULT_ATTRS = {
  min: 0,
  max: 100,
  step: 1
};

/**
 * Cell editor component to handle Numeric input in grid views
 */
class NumericEditor extends React.Component {
  /**
   * Constructor for NumericEditor component
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.numericInput = React.createRef();
    this.state = NumericEditor.createInitialState(props);
  }

  /**
   * Initialise the state of the component
   * @param {Object} props - props received from ag-grid
   * @return {{highlightAllOnFocus: boolean, value: string}}
   */
  static createInitialState(props) {
    const inputAttrs = props.colDef.attributes
      ? clone(props.colDef.attributes)
      : DEFAULT_ATTRS;
    let startValue;
    let highlightAllOnFocus = true;
    if (props.keyPress === KEY.BACKSPACE || props.keyPress === KEY.DELETE) {
      // if backspace or delete pressed, we clear the cell
      startValue = '';
    } else if (props.charPress) {
      // if a letter was pressed, we start with the letter
      startValue = props.charPress;
      highlightAllOnFocus = false;
    } else {
      // otherwise we start with the current value
      startValue = props.value;
      if (props.keyPress === KEY.F2) {
        highlightAllOnFocus = false;
      }
    }

    return {
      value: startValue,
      highlightAllOnFocus,
      inputAttrs
    };
  }

  /**
   * Check if a number is entered
   * @param {Object} event
   * @return {boolean}
   */
  static isKeyPressedNumeric(event) {
    const charCode =
      typeof event.which === 'undefined' ? event.keyCode : event.which;
    const charStr = event.key ? event.key : String.fromCharCode(charCode);
    return !!/\d/.test(charStr);
  }

  /**
   * Handler for `keydown` event on input
   * @param {Object} event
   */
  static onKeyDown(event) {
    const isArrow =
      [KEY.ARROW_LEFT, KEY.ARROW_RIGHT, KEY.ARROW_UP, KEY.ARROW_DOWN].indexOf(
        event.keyCode
      ) > -1;
    if (isArrow || NumericEditor.deleteOrBackspace(event)) {
      event.stopPropagation();
      return;
    }

    if (!NumericEditor.isKeyPressedNumeric(event)) {
      event.preventDefault();
    }
  }

  /**
   * Check if Delete or backspace was pressed
   * @param {Object} event
   * @return {boolean}
   */
  static deleteOrBackspace(event) {
    return [KEY.DELETE, KEY.BACKSPACE].indexOf(event.keyCode) > -1;
  }

  /**
   * This life-cycle event is called once the component gets attached to the DOM
   * In React terms, this is called after componentDidMount
   */
  afterGuiAttached() {
    // get ref from React component
    const eInput = this.numericInput.current;
    eInput.focus();
    if (this.state.highlightAllOnFocus) {
      eInput.select();

      this.setState({
        highlightAllOnFocus: false
      });
    }
  }

  /**
   * Use this ag-grid life-cycle event to capture the new value entered in the cell
   * @return {*}
   */
  getValue() {
    return this.state.value;
  }

  /**
   * Use this life-cycle event to check whether the editor component
   * gui should be attached or not
   * @return {boolean}
   */
  isCancelBeforeStart() {
    return (
      this.props.charPress && '1234567890'.indexOf(this.props.charPress) < 0
    );
  }

  /**
   * Use this life-cycle event to check whether the input value should be
   * used to update the cell or not. Can be used to filter out specific values
   * that shouldn't be allowed to be entered to the grid cell
   * @return {boolean}
   */
  isCancelAfterEnd() {
    const { min } = this.state.inputAttrs;
    // const max = this.state.inputAttrs.max;
    // return this.state.value < min || this.state.value > max;
    return this.state.value < min;
  }

  /**
   * Handler for `onchange` event on input
   * @param {Event} event
   */
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  /**
   * Render the component
   * @return {JSX.Element}
   */
  render() {
    return (
      <InputContainer
        ref={this.numericInput}
        value={this.state.value}
        type="number"
        onChange={this.handleChange}
        onKeyDown={NumericEditor.onKeyDown}
        {...this.state.inputAttrs}
      />
    );
  }
}

export default NumericEditor;
