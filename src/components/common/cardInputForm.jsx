import React from 'react';
import { connect } from 'react-redux';
import { Ref, Grid, Form, Card, Icon, Button, Modal, Header, Input, TextArea } from 'semantic-ui-react';
import { addTask, updateTask, deleteTask } from '../../actions/task';
import { addStory, updateStory, deleteStory } from '../../actions/story';
import { switchEditModeCardInputForm, hideCardInputForm, switchConfirmDialog } from '../../actions/cardInputForm';

const mapStateToProps = (state, props) => {
    return {
    };
};

class ConfirmModal extends React.Component {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    close() {
        this.props.switchConfirmDialog(false);
    }

    deleteTask() {
        switch (this.props.mode) {
        case 'story':
            this.props.deleteStory(this.props.card);
            break;
        case 'task':
            this.props.deleteTask(this.props.card);
            break;
        }

        this.close();
        this.props.hideCardInputForm(null);
    }

    render() {
        const { openConfirm, card } = this.props;

        return (
            <Modal
                dimmer='inverted'
                open={openConfirm}
                size='small'
            >
                <Modal.Header>
                    Delete #{card.id} {card.title}
                </Modal.Header>
                <Modal.Content>
                    <p>Are you sure?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button compact color='red' content="OK" onClick={this.deleteTask} />
                    <Button compact color='grey' content="Cancel" onClick={this.close} />
                </Modal.Actions>
            </Modal>
        )
    }
}

class CardInputForm extends React.Component {
    constructor(props) {
        super(props)
        this.close = this.close.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.enableEditMode = this.enableEditMode.bind(this);
        this.disableEditMode = this.disableEditMode.bind(this);
        this.openConfirm = this.openConfirm.bind(this);

        this.state = {
            title: '',
            description: '',
        }
    }

    componentWillReceiveProps(props) {
        if (props.card) {
            const card = props.card;
            this.setDefaultState(
                card.title,
                card.description
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
        const { mode, card } = this.props;

        switch(mode) {
        case 'story':
            if (this.props.card) {
                this.props.updateStory(
                    this.props.card.sprintId,
                    this.props.card,
                    this.state.title,
                    this.state.description
                );
            } else {
                this.props.addStory(
                    this.props.parentId,
                    this.state.title,
                    this.state.description
                )
            }
            break;
        case 'task':
            if (this.props.card) {
                this.props.updateTask(
                    this.props.card.storyId,
                    this.props.card,
                    this.state.title,
                    this.state.description
                );
            } else {
                this.props.addTask(
                    this.props.parentId,
                    this.state.title,
                    this.state.description
                )
            }
            break;
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
        this.disableEditMode();
    }

    handleRef(element) {
        element.querySelector('input').focus()
    }

    enableEditMode() {
        this.props.switchEditModeCardInputForm(true);
    }

    disableEditMode() {
        this.props.switchEditModeCardInputForm(false);
    }

    openConfirm() {
        this.props.switchConfirmDialog(true);
    }

    renderHeader() {
        const { isNew, isEdit, card, mode } = this.props;
        const { title, description } = this.state;

        let headerId = `Add new ${mode}`;
        if (card) {
            headerId = `#${card.id}`;
        }

        return (
            <Grid columns={3} verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={1}>
                        <Header as='h3'>{headerId}</Header>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        {(isEdit || isNew) ? (
                            <Form>
                                <Ref
                                    innerRef={this.handleRef}
                                >
                                    <Form.Field inline>
                                        <Input
                                            placeholder='Title'
                                            onChange={(e) => this.setState({title: e.target.value})}
                                            value={title}
                                            fluid />
                                    </Form.Field>
                                </Ref>
                            </Form>
                        ) : (
                            <Header as='h3'>{title}</Header>
                        )}
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='right'>
                        { !isNew &&
                            <Button.Group>
                                    <Button basic color='grey' icon onClick={this.enableEditMode}>
                                        <Icon name='write' />
                                    </Button>
                                    <Button basic color='red' icon onClick={this.openConfirm}>
                                        <Icon name='trash' />
                                    </Button>
                                <ConfirmModal {...this.props} />
                            </Button.Group>
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    renderDescription() {
        const { isNew, isEdit } = this.props;
        const { title, description } = this.state;

        if (isEdit || isNew) {
            return (
                <Form>
                    <Form.Field
                        id='form-textarea-control-description'
                        control={TextArea}
                        label='Description'
                        placeholder='Description'
                        onChange={(e) => this.setState({description: e.target.value})}
                        value={description} />
                </Form>
            );
        }

        return (
            <div>
                { description }
            </div>
        );
    }

    render() {
        const { title, description } = this.state;
        const { card, dimmer, open, isEdit, mode } = this.props;

        const ref = open ? this.handleRef : null;

        const submitLabel = `${card ? 'Update' : 'Add'} ${mode}`

        return (
            <div>
                <Modal dimmer={dimmer} open={open}>
                    <Modal.Header style={{padding: '1.25rem 1.5rem'}}>
                        {this.renderHeader()}
                    </Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            {this.renderDescription()}
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button compact color='blue' content={submitLabel} onClick={this.onSubmit} />
                        <Button compact color='grey' content="Cancel" onClick={this.close} />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, { addTask, updateTask, addStory, updateStory, deleteStory, switchEditModeCardInputForm, hideCardInputForm, switchConfirmDialog, deleteTask })(CardInputForm);