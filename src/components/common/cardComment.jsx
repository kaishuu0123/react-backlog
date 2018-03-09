import React from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown';
import TableBlock from '../markdown-renderer/tableBlock.jsx';
import CodeBlock from '../markdown-renderer/codeBlock.jsx';

import octCatSvg from '../../images/octcat.svg';

class CardComment extends React.Component {
    render() {
        const markdownExampleComment = `
* markdown
    * support

\`\`\`js
function HelloWorld() {
    console.log('Hello, World');
}
\`\`\`
`;

        return (
            <Comment.Group>
                <Comment>
                    <Comment.Avatar src={octCatSvg} />
                    <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                        <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <ReactMarkdown
                                source='How artistic!'
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

                <Comment>
                    <Comment.Avatar src={octCatSvg} />
                    <Comment.Content>
                        <Comment.Author as='a'>Elliot Fu</Comment.Author>
                        <Comment.Metadata>
                            <div>Yesterday at 12:30AM</div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <ReactMarkdown
                                source='This has been very useful for my research. Thanks as well!'
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

                <Comment>
                    <Comment.Avatar src={octCatSvg} />
                    <Comment.Content>
                        <Comment.Author as='a'>Joe Henderson</Comment.Author>
                        <Comment.Metadata>
                            <div>5 days ago</div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <ReactMarkdown
                                source='Dude, this is awesome. Thanks so much'
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

                <Comment>
                    <Comment.Avatar src={octCatSvg} />
                    <Comment.Content>
                        <Comment.Author as='a'>kaishuu0123</Comment.Author>
                        <Comment.Metadata>
                            <div>5 days ago</div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <ReactMarkdown
                                source={markdownExampleComment}
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

                <Form style={{marginTop: '1em'}}>
                    <Form.TextArea rows={5} placeholder='Comment'/>
                    <Button compact content='Add Reply' labelPosition='left' icon='edit' primary />
                </Form>
            </Comment.Group>
        )
    }
}

export default CardComment;