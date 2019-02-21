import CodeMirror from 'react-codemirror';
import React from 'react';

/**
 * Content editing and viewing panel.
 */
class ContentPanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      code: "// this is a test",
      mode: 'markdown',
      readOnly: false
    };
  }

  /**
   * Render the component.
   * @returns {XML}
   */
  render() {
    return (
      <div className={'content panel'}>
        {this.renderEditor()}
      </div>
    );
  }

  /**
   * Render the editing panel.
   * @returns {XML}
   */
  renderEditor () {
    var options = {
      lineNumbers: true,
    };
    return (
      <CodeMirror
        className={'editor'}
        onChange={this.updateCode.bind(this)}
        options={options}
        ref="editor"
        value={this.state.code}
      />
    );
  }

  updateCode (newCode) {
    this.setState({code: newCode});
  }
}

module.exports = ContentPanel;
