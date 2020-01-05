import PropTypes from 'prop-types';
import { equals } from 'ramda';
import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Editor } from './styles';

// editor styles
import 'codemirror/lib/codemirror.css';

// syntax highlighters
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/yaml/yaml';

// theme
import 'codemirror/theme/monokai.css';

/**
 * Document editor.
 */
class DocumentEditorComponent extends React.Component {
  /**
   * Constructor
   * @param {object} props - Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || '',
      options: {
        lineNumbers: true,
        mode: 'javascript',
        theme: 'monokai'
      }
    };
  }

  /**
   * Handle document change event.
   * @param a
   * @param b
   * @param c
   */
  onChange(a, b, c) {
    // console.info('change', a, b, c);
  }

  render() {
    const { data, options } = this.state;
    return (
      <Editor>
        <CodeMirror
          onChange={this.onChange.bind(this)}
          options={options}
          value={this.props.data} />
      </Editor>
    );
  }
}

DocumentEditorComponent.propTypes = {
  data: PropTypes.string,
  onChange: PropTypes.func
};

export default DocumentEditorComponent;
