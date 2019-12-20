import React from 'react';

class TagEditor extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  afterGuiAttached() {
    if (this.inputRef) {
      this.inputRef.current.focus();
    }
  }

  getValue() {
    const { value } = this.inputRef.current;
    if (Array.isArray(value)) {
      return value;
    }
    const arr = value.split(',').map(el => el.trim());
    return arr;
  }

  onKeyDown(event) {
    if (event.keyCode === 39 || event.keyCode === 37) {
      event.stopPropagation();
    }
  }

  onKeyPress(event) {
    // if (!isNumeric(event.nativeEvent)) {
    //   event.preventDefault();
    // }
    //
    // function isNumeric(event) {
    //   return /\d/.test(event.key);
    // }
  }

  render() {
    let { value } = this.props;
    if (value) {
      value = value.join(', ');
    } else {
      value = '';
    }
    return (
      <input
        defaultValue={this.props.value}
        onKeyDown={this.onKeyDown}
        onKeyPress={this.onKeyPress}
        ref={this.inputRef}
      />
    );
  }
}

export default TagEditor;
