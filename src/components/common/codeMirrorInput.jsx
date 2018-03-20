import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import {
    Popup
} from 'semantic-ui-react'
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/gfm/gfm.js';
import 'codemirror/addon/edit/continuelist.js';
import 'codemirror/addon/display/placeholder.js';

class CodeMirrorInput extends React.Component {
    constructor(props) {
        super(props)

        this.editorRefCallback = this.editorRefCallback.bind(this);
    }

    editorRefCallback(ref) {
        if (!ref) {
            return;
        }

        const cm = ref.editor
        const { width, height } = this.props;
        // set width & height
        cm.setSize('auto', height);
    }

    render() {
        const { value, onBeforeChange, onBlur, onFocus, style, placeholder } = this.props;

        return (
            <div className="CodeMirrorWrapper">
                <CodeMirror
                    ref={this.editorRefCallback}
                    value={value}
                    options={{
                        mode: { name: 'gfm', gitHubSpice: false },
                        theme: 'default',
                        lineWrapping: true,
                        extraKeys: {
                            "Enter": "newlineAndIndentContinueMarkdownList",
                            "Tab": "indentMore",
                            "Shift-Tab": "indentLess",
                        },
                        indentUnit: 4,
                        smartIndent: true,
                        indentWithTabs: false,
                        placeholder: placeholder
                    }}
                    onBeforeChange={onBeforeChange}
                    onChange={(editor, data, value) => {
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    style={style}
                />
            </div>
        )
    }
}

export default CodeMirrorInput;