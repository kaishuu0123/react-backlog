import React from 'react';
import { connect } from 'react-redux';
import { Ref, Form, Card, Icon, Button, Modal, Header, Input, TextArea } from 'semantic-ui-react';
import { addTask } from '../../actions/task';
import { addCardInputForm, hideCardInputForm } from '../../actions/cardInputForm';

const mapStateToProps = (state, props) => {
    const entry = state.cardInputForm.find((entry, index) => {
        return (entry.storyId === props.storyId);
    });

    if (entry) {
        return {
            open: entry.open
        };
    }

    return {
        open: false
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
            taskTitle: '',
            taskDescription: ''
        }

        this.props.addCardInputForm(this.props.storyId);
    }

    close() {
        this.props.hideCardInputForm(this.props.storyId);
    }

    // refs: https://gist.github.com/pstoica/4323d3e6e37e8a23dd59
    onBlur(e) {
        var currentTarget = e.currentTarget;

        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                this.setState({
                    taskTitle: '',
                    taskDescription: ''
                });
                this.props.hideCardInputForm(this.props.storyId);
            }
        }, 0);
    }

    onSubmit() {
        this.props.addTask(
            this.props.storyId,
            this.state.taskTitle,
            this.state.taskDescription
        )

        this.clearForm()
        this.props.hideCardInputForm(this.props.storyId);
    }

    onCancel() {
        this.clearForm()
        this.props.hideCardInputForm(this.props.storyId);
    }

    clearForm() {
        this.setState({
            taskTitle: '',
            taskDescription: ''
        });
    }

    handleRef(element) {
        element.focus()
    }

    render() {
        const { taskTitle, taskDescription } = this.state;
        const { open } = this.props;

        const ref = open ? this.handleRef : null;

        return (
            <div onBlur={this.onBlur}>
                <Card style={open ? {} : { display: 'none' }}>
                    <Card.Content>
                        <Card.Header style={{width: '100%'}}>
                            <Input
                                ref={ref}
                                placeholder='Title'
                                style={{width: '100%'}}
                                onChange={(e) => this.setState({taskTitle: e.target.value})}
                                value={taskTitle} />
                        </Card.Header>
                        <Card.Description style={{width: '100%'}}>
                            <Form>
                                <TextArea
                                    placeholder='Description'
                                    style={{width: '100%'}}
                                    onChange={(e) => this.setState({taskDescription: e.target.value})}
                                    value={taskDescription} />
                            </Form>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button compact size="small" color='blue' onClick={this.onSubmit}>Submit</Button>
                        <Button compact size="small" color='grey' onClick={this.onCancel}>Cancel</Button>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}

export default connect(mapStateToProps, { addTask, addCardInputForm, hideCardInputForm })(CardInputForm);