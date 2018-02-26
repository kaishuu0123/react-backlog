import React from 'react';
import { connect } from 'react-redux';
import { Popup, Button, Header, Image, Modal, Form, Input, TextArea } from 'semantic-ui-react'
import { hideStoryInputDialog } from '../../actions/storyInputDialog';
import { addStory } from '../../actions/story';

function mapStateToProps(state) {
    return {
    };
}

class StoryInputDialog extends React.Component {
    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);
        this.close = this.close.bind(this);
        this.clear = this.clear.bind(this);

        this.state = {
            title: '',
            description: ''
        }
    }

    componentWillReceiveProps(props) {
        if (props.story) {
            const story = props.story;
            this.setDefaultState(
                story.title,
                story.description
            );
        }
    }

    setDefaultState(title, description) {

        // Set state using data.
        this.setState({
            title: title,
            description: description
        })
    }

    submit() {
        this.props.addStory(
            this.props.sprintId,
            this.state.title,
            this.state.description
        );

        this.clear();
        this.props.hideStoryInputDialog();
    }

    close() {
        this.clear();
        this.props.hideStoryInputDialog();
    }

    clear() {
        this.setState({
            title: '',
            description: '',
        });
    }

    render() {
        const { title, description } = this.state;
        const { open, dimmer, sprintId } = this.props;

        return (
            <Modal dimmer={dimmer} open={open}>
                <Modal.Header>Story</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Form>
                        <Form.Field
                            id='form-input-control-story-title'
                            control={Input}
                            label='Title'
                            placeholder='Title'
                            onChange={(e) => this.setState({title: e.target.value})}
                            value={title} />
                        <Form.Field
                            id='form-textarea-control-description'
                            control={TextArea}
                            label='Description'
                            placeholder='Description'
                            onChange={(e) => this.setState({description: e.target.value})}
                            value={description} />
                    </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button compact color='blue' content="Add Story" onClick={this.submit} />
                    <Button compact color='grey' onClick={this.close}>
                    Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default connect(mapStateToProps, { hideStoryInputDialog, addStory })(StoryInputDialog);