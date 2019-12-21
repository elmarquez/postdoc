import React from 'react';
import CodeMirror from 'react-codemirror';
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
    constructor(props) {
        super(props);
        this.state = {
            value: 'This is a test',
            options: {
                lineNumbers: true,
                mode: 'javascript',
                theme: 'monokai'
            }
        };
    }

    onChange(a, b, c) {
        console.info('change', a, b, c);
    }

    render() {
        const { options, value } = this.state;
        return (
            <Editor>
                <CodeMirror value={value} onChange={this.onChange.bind(this)} options={options} />
            </Editor>
        );
    }
}

export default DocumentEditorComponent;