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
      <CodeMirror ref="editor" className={'editor'} value={this.state.code} onChange={this.updateCode} options={options} />
    );
  }

  updateCode (newCode) {
    this.setState({code: newCode});
  }
}

module.exports = ContentPanel;
