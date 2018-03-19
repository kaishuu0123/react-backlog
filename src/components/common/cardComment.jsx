import React from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Form, Header, Segment } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown';
import TableBlock from '../markdown-renderer/tableBlock.jsx';
import CodeBlock from '../markdown-renderer/codeBlock.jsx';
import CodeMirrorInput from './codeMirrorInput.jsx'

import { addCommentToStory } from '../../actions/story';
import { addCommentToTask } from '../../actions/task';

import octCatSvg from '../../images/octcat.svg';

function mapStateToProps(state) {
    return {
        stories: state.story,
        tasks: state.tasks
    }
}

class CardComment extends React.Component {
    constructor(props) {
        super(props)

        this.addComment = this.addComment.bind(this);

        this.state = {
            body: ''
        }
    }

    addComment() {
        const {
            mode,
            card,
            comments
        } = this.props;

        switch(mode) {
        case 'story':
            this.props.addCommentToStory(card, this.state.body)
            break;
        case 'task':
            this.props.addCommentToTask(card, this.state.body)
            break;
        }

        this.setState({
            body: null
        })
    }

    render() {
        const {
            mode,
            card,
            comments
        } = this.props;

        return (
            <Comment.Group>
                { (comments || []).map((comment, index) => (
                    <Comment key={index}>
                        <Comment.Avatar src={octCatSvg} />
                        <Comment.Content>
                            <Comment.Author as='a'>{comment.username}</Comment.Author>
                            <Comment.Metadata>
                                <div>{comment.date}</div>
                            </Comment.Metadata>
                            <Comment.Text>
                                <ReactMarkdown
                                    source={comment.body}
                                    skipHtml={false}
                                    escapeHtml={false}
                                    renderers={{
                                        table: TableBlock,
                                        code: CodeBlock
                                    }}
                                />
                            </Comment.Text>
                        </Comment.Content>
                    </Comment>
                ))}

                <Form style={{marginTop: '1em'}}>
                    <Segment style={{padding: '0.5em'}}>
                        <CodeMirrorInput
                            onBeforeChange={(editor, data, value) => {
                                this.setState({body: value})
                            }}
                            value={this.state.body}
                            height={'auto'}
                        />
                    </Segment>
                    <Button compact content='Add Reply' labelPosition='left' icon='edit' primary onClick={this.addComment} />
                </Form>
            </Comment.Group>
        )
    }
}

export default connect(mapStateToProps, { addCommentToStory, addCommentToTask })(CardComment);