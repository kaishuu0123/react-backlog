import React from 'react';
import { connect } from 'react-redux';
import {
    Label,
    Ref,
    Grid,
    Form,
    Card,
    Icon,
    Button,
    Modal,
    Header,
    Input,
    TextArea,
    Popup,
    Segment
} from 'semantic-ui-react';
import Mousetrap from 'mousetrap';
import isEmpty from 'lodash/isEmpty';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind.min.js'
import { addTask, updateTask, deleteTask } from '../../actions/task';
import { addStory, updateStory, deleteStory } from '../../actions/story';
import { switchEditModeCardInputForm, hideCardInputForm, switchConfirmDialog } from '../../actions/cardInputForm';

import CardComment from './cardComment.jsx';

import ReactMarkdown from 'react-markdown';
import TableBlock from '../markdown-renderer/tableBlock.jsx';
import CodeBlock from '../markdown-renderer/codeBlock.jsx';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/gfm/gfm.js';
import 'codemirror/addon/edit/continuelist.js';

const mapStateToProps = (state, props) => {
    return {
    };
};

const codeMirrorFocusSegmentStyle = {
    border: '1px solid #85b7d9',
    borderRadius: '0.2em',
    boxShadow: '0 0 0 0 rgba(34,36,38,.35) inset'
}

class ConfirmModal extends React.Component {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
    }

    close() {
        this.props.switchConfirmDialog(false);
    }

    deleteCard() {
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
                    <Button compact color='red' content="OK" onClick={this.deleteCard} />
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

        this.codeMirrorFocus = this.codeMirrorFocus.bind(this);
        this.codeMirrorBlur = this.codeMirrorBlur.bind(this);

        this.state = {
            title: '',
            description: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!isEmpty(nextProps.card)) {
            const card = nextProps.card;
            this.setDefaultState(
                card.title,
                card.description,
            );
        }

        if (nextProps.open) {
            Mousetrap.bindGlobal(['command+s', 'ctrl+s'], function(e) {
                this.onSubmit();

                // prevent default
                return false;
            }.bind(this));
            Mousetrap.bind(['command+e', 'ctrl+e'], this.enableEditMode);
        } else {
            Mousetrap.unbind(['ctrl+s', 'command+s']);
            Mousetrap.unbind(['ctrl+e', 'command+e']);
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

        const [type, cardFunc] = (() => {
            switch(mode) {
            case 'story':
                return isEmpty(this.props.card) ?
                    ['add', this.props.addStory] :
                    ['update', this.props.updateStory]
            case 'task':
                return isEmpty(this.props.card) ?
                    ['add', this.props.addTask] :
                    ['update', this.props.updateTask]
            }
        })();

        switch(type) {
        case 'add':
            cardFunc(
                this.props.parentId,
                this.state.title,
                this.state.description
            )
            this.clearForm()
            this.props.hideCardInputForm(this.props.storyId);
            break;
        case 'update':
            cardFunc(
                this.props.parentId,
                this.props.card,
                this.state.title,
                this.state.description
            );
            this.disableEditMode()
            break;
        }
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

    codeMirrorFocus(editor, event) {
        this.setState({
            isCodeMirrorFocus: true
        })
    }

    codeMirrorBlur(editor, event) {
        this.setState({
            isCodeMirrorFocus: false
        })
    }

    renderHeader() {
        const { isNew, isEdit, card, mode } = this.props;
        const { title, description } = this.state;

        const [idWidth, titleWidth, buttonWidth] = isNew ? [2, 12, 2] : [1, 12, 3];

        return (
            <Grid columns={3} verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={idWidth}>
                        { !isNew &&
                            <Header as='h2'>{`#${card.id}`}</Header>
                        }
                        { isNew &&
                            <p>New {mode}</p>
                        }
                    </Grid.Column>
                    <Grid.Column width={titleWidth}>
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
                            <Header as='h2'>{title}</Header>
                        )}
                    </Grid.Column>
                    <Grid.Column width={buttonWidth} textAlign='right'>
                        { !isNew && !isEdit &&
                            <Button.Group>
                                <Popup
                                    trigger={
                                        <Button basic color='grey' icon onClick={this.enableEditMode}>
                                            <Icon name='write' />
                                        </Button>
                                    }
                                    content='Edit Card (Ctrl+E)'
                                    position='top center'
                                    on='hover'
                                />
                                <Popup
                                    trigger={
                                        <Button basic color='grey' icon onClick={this.openConfirm}>
                                            <Icon name='trash' />
                                        </Button>
                                    }
                                    content='Delete Card'
                                    position='top center'
                                    on='hover'
                                />
                                <ConfirmModal {...this.props} />
                            </Button.Group>
                        }
                        { (isNew || isEdit) &&
                            <Popup
                                trigger={
                                    <Button basic color='teal' icon onClick={this.onSubmit}>
                                        <Icon name='checkmark' />
                                    </Button>
                                }
                                content={
                                    isNew ? 'Save Card (Ctrl+S)' : 'Update Card (Ctrl+S)'
                                }
                                position='top center'
                                on='hover'
                            />
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
                <div className="CodeMirrorWrapper">
                    <CodeMirror
                        value={description}
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
                            indentWithTabs: false
                        }}
                        onBeforeChange={(editor, data, value) => {
                            this.setState({description: value});
                        }}
                        onChange={(editor, data, value) => {
                        }}
                        onFocus={this.codeMirrorFocus}
                        onBlur={this.codeMirrorBlur}
                    />
                </div>
            );
        }

        return (
            <div className='markdown'>
                <ReactMarkdown
                    source={description}
                    skipHtml={false}
                    escapeHtml={false}
                    renderers={{
                        table: TableBlock,
                        code: CodeBlock
                    }}
                />
            </div>
        );
    }

    render() {
        const { title, description, isCodeMirrorFocus } = this.state;
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
                            <Header as='h3' dividing>
                                Description
                            </Header>
                            <Segment style={
                                isCodeMirrorFocus ? codeMirrorFocusSegmentStyle : {}
                            }>
                                {this.renderDescription()}
                            </Segment>
                        </Modal.Description>
                        <Modal.Description style={{marginTop: '1em'}}>
                            <Header as='h3' dividing>
                                Comments
                            </Header>
                            <CardComment />
                        </Modal.Description>
                    </Modal.Content>
                    <Popup
                        trigger={
                            <Label as='a' floating onClick={this.onCancel}>
                                <Icon name="close" style={{margin: '0px'}} />
                            </Label>
                        }
                        content='Close Window'
                        position='top center'
                        on='hover'
                    />
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, { addTask, updateTask, addStory, updateStory, deleteStory, switchEditModeCardInputForm, hideCardInputForm, switchConfirmDialog, deleteTask })(CardInputForm);