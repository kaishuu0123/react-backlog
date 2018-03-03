import React from 'react';
import { connect } from 'react-redux';
import { Ref, Form, Card, Icon, Button, Modal, Header, Input, TextArea } from 'semantic-ui-react';
import { addTask, updateTask } from '../../actions/task';
import { hideCardInputForm } from '../../actions/cardInputForm';

const mapStateToProps = (state, props) => {
    return {
    };
};

class CardInputForm extends React.Component {
    constructor(props) {
        super(props)
        this.close = this.close.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.clearForm = this.clearForm.bind(this);

        this.state = {
            title: '',
            description: ''
        }
    }

    componentWillReceiveProps(props) {
        if (props.task) {
            const task = props.task;
            this.setDefaultState(
                task.title,
                task.description
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

    close() {
        this.clearForm()
        this.props.hideCardInputForm(this.props.storyId);
    }

    // refs: https://gist.github.com/pstoica/4323d3e6e37e8a23dd59
    onBlur(e) {
        var currentTarget = e.currentTarget;

        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                this.setState({
                    title: '',
                    description: ''
                });
                this.props.hideCardInputForm(this.props.storyId);
            }
        }, 0);
    }

    onSubmit() {
        if (this.props.task) {
            this.props.updateTask(
                this.props.task.storyId,
                this.props.task,
                this.state.title,
                this.state.description
            );
        } else {
            this.props.addTask(
                this.props.storyId,
                this.state.title,
                this.state.description
            )
        }

        this.clearForm()
        this.props.hideCardInputForm(this.props.storyId);
    }

    onCancel() {
        this.clearForm()
        this.props.hideCardInputForm(this.props.storyId);
    }

    clearForm() {
        this.setState({
            title: '',
            description: ''
        });
    }

    handleRef(element) {
        element.querySelector('input').focus()
    }

    render() {
        const { title, description } = this.state;
        const { dimmer, open } = this.props;

        const ref = open ? this.handleRef : null;

        return (
            <div onBlur={this.onBlur}>
                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Task</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                        <Form>
                            <Ref
                                innerRef={this.handleRef}
                            >
                                <Form.Field
                                    id='form-input-control-story-title'
                                    control={Input}
                                    label='Title'
                                    placeholder='Title'
                                    onChange={(e) => this.setState({title: e.target.value})}
                                    value={title} />
                            </Ref>
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
                        <Button compact color='blue' content="Add Task" onClick={this.onSubmit} />
                        <Button compact color='grey' onClick={this.close}>
                        Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, { addTask, updateTask, hideCardInputForm })(CardInputForm);