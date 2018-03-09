import React from 'react';
import hljs from 'highlight.js/lib';

class CodeBlock extends React.Component {
    constructor(props) {
        super(props)
        this.setRef = this.setRef.bind(this);
    }

    setRef(el) {
        this.codeEl = el;
    }

    componentDidMount() {
        this.highlightCode()
    }

    componentDidUpdate() {
        this.highlightCode()
    }

    highlightCode() {
        hljs.highlightBlock(this.codeEl);
    }

    render() {
        return (
            <pre>
                <code ref={this.setRef} className={`language-${this.props.language}`}>
                    {this.props.value}
                </code>
            </pre>
        )
    }
}

export default CodeBlock;