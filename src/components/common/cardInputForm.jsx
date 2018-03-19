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
    Popup,
    Segment,
    Input,
    Divider
} from 'semantic-ui-react';
import Mousetrap from 'mousetrap';
import isEmpty from 'lodash/isEmpty';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind.min.js'
import { addTask, updateTask, deleteTask } from '../../actions/task';
import { addStory, updateStory, deleteStory } from '../../actions/story';
import {
    switchEditModeCardInputForm,
    hideCardInputForm,
    switchConfirmDialog,
    changeCardAssigned,
    changeCardStatus,
    changeCardPoint
} from '../../actions/cardInputForm';

import CardComment from './cardComment.jsx';
import ConfirmModal from './confirmModal';
import CustomSimpleDropdown from './customSimpleDropdown.jsx';

import ReactMarkdown from 'react-markdown';
import TableBlock from '../markdown-renderer/tableBlock.jsx';
import CodeBlock from '../markdown-renderer/codeBlock.jsx';

import CodeMirrorInput from './codeMirrorInput.jsx'

const mapStateToProps = (state, props) => {
    return {
        sprints: state.sprint,
        stories: state.story,
        tasks: state.task,
    };
};

const codeMirrorFocusSegmentStyle = {
    border: '1px solid #85b7d9',
    borderRadius: '0.2em',
    boxShadow: '0 0 0 0 rgba(34,36,38,.35) inset',
    padding: '0.5em'
}

const codeMirrorNonFocusSegmentStyle = {
    border: '1px solid rgba(34,36,38,.15)',
    borderRadius: '0.2em',
    boxShadow: '0 0 0 0 rgba(34,36,38,.35) inset',
    padding: '0.5em'
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

        this.onChangeCardAssigned = this.onChangeCardAssigned.bind(this);
        this.onChangeCardStatus = this.onChangeCardStatus.bind(this);
        this.onChangeCardPoint = this.onChangeCardPoint.bind(this);

        this.findCard = this.findCard.bind(this);
        this.findSprintTitle = this.findSprintTitle.bind(this);
        this.findStoryTitle = this.findStoryTitle.bind(this);

        this.state = {
            title: '',
            description: '',
            assigned: null,
            statusId: 1,
            pointId: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cardId) {
            this.setDefaultState(
                nextProps.mode,
                nextProps.cardId,
                nextProps
            );
        }

        if (nextProps.open) {
            Mousetrap.bindGlobal(['command+s', 'ctrl+s'], function(e) {
                this.onSubmit();

                // prevent default
                return false;
            }.bind(this));
            Mousetrap.bind(['command+e', 'ctrl+e'], function(e) {
                this.enableEditMode();

                return false;
            }.bind(this));
            Mousetrap.bindGlobal(['command+c', 'ctrl+c'], function(e) {
                this.onCancel();

                // prevent default
                return false;
            }.bind(this));
        } else {
            Mousetrap.unbind(['ctrl+s', 'command+s']);
            Mousetrap.unbind(['ctrl+e', 'command+e']);
            Mousetrap.unbind(['ctrl+c', 'command+c']);
        }
    }

    setDefaultState(mode, cardId, nextProps) {
        const card = this.findCard(mode, cardId, nextProps)
        const { title, description, assigned, statusId, pointId } = card;
        // Set state using data.
        this.setState({
            title: title,
            description: description,
            assigned: assigned,
            statusId: statusId,
            pointId: pointId
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
        const { mode, cardId } = this.props;

        const [type, cardFunc] = (() => {
            switch(mode) {
            case 'story':
                return !cardId ?
                    ['add', this.props.addStory] :
                    ['update', this.props.updateStory]
            case 'task':
                return !cardId ?
                    ['add', this.props.addTask] :
                    ['update', this.props.updateTask]
            }
        })();

        switch(type) {
        case 'add':
            cardFunc(
                this.props.parentId,
                this.state.title,
                this.state.description,
                this.state.assigned,
                this.state.statusId,
                this.state.pointId
            )
            this.clearForm()
            this.props.hideCardInputForm(this.props.storyId);
            break;
        case 'update':
            const card = this.findCard(mode, cardId);
            cardFunc(
                this.props.parentId,
                card,
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

    onChangeCardAssigned(selectedValue) {
        const { parentId, cardId, mode } = this.props;

        this.setState({
            assigned: selectedValue
        });

        if (cardId) {
            this.props.changeCardAssigned(mode, parentId, cardId, selectedValue);
        }
    }

    onChangeCardStatus(selectedValue) {
        const { parentId, cardId, mode } = this.props;

        this.setState({
            statusId: selectedValue
        });

        if (cardId) {
            this.props.changeCardStatus(mode, parentId, cardId, selectedValue)
        }
    }

    onChangeCardPoint(selectedValue) {
        const { parentId, cardId, mode } = this.props;

        this.setState({
            pointId: selectedValue
        });

        if (cardId) {
            this.props.changeCardPoint(mode, parentId, cardId, selectedValue);
        }
    }

    findSprintTitle(parentId) {
        const sprint = this.props.sprints.find((sprint) => {
            return sprint.id === parentId;
        })
        return sprint && sprint.title
    }

    findStoryTitle(storyId) {
        let story = null;
        const { stories } = this.props;

        Object.keys(stories).some((key) => {
            stories[key].some((item) => {
                if (item.id === storyId) {
                    story = item;
                    return true;
                }
            })

            if (story) {
                return true;
            }
        });

        return story && story.title
    }

    renderHeader() {
        const { isNew, isEdit, cardId, mode } = this.props;
        const { title, description, assigned, statusId, point } = this.state;

        const [idWidth, titleWidth, buttonWidth] = isNew ? [0, 14, 2] : [1, 12, 3];

        const card = this.findCard(mode, cardId)

        const relatedTitle = (mode === 'story') ? (
            this.findSprintTitle(card && card.sprintId)
        ) : (
            this.findStoryTitle(card && card.storyId)
        )

        return (
            <Grid columns={3} verticalAlign='middle'>
                <Header as='h6' disabled style={{marginTop: '0.5em', marginBottom: '0em'}}>
                    { isNew ? (
                        <p>New {mode}</p>
                    ) : (
                        mode === 'story' ? (
                            <p>Related: {relatedTitle}</p>
                        ) : (
                            <p>Related: #{card && card.storyId} {relatedTitle}</p>
                        )
                    )}
                </Header>
                <Grid.Row>
                    { idWidth !== 0 &&
                        <Grid.Column width={idWidth}>
                            { !isNew &&
                                <Header as='h2'>
                                    {`#${card.id}`}
                                </Header>
                            }
                        </Grid.Column>
                    }
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
                                <ConfirmModal {...this.props} card={card} />
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
                <CodeMirrorInput
                    onBeforeChange={(editor, data, value) => {
                        this.setState({description: value});
                    }}
                    onFocus={(editor, event) => {
                        this.setState({
                            isCodeMirrorFocus: false
                        })
                    }}
                    onBlur={(editor, event) => {
                        this.setState({
                            isCodeMirrorFocus: true
                        })
                    }}
                    value={description}
                    height={'auto'}
                />
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

    findCard(mode, cardId, nextProps = null) {
        const { stories, tasks } = this.props;

        let card;
        switch(mode) {
        case 'story': {
            const collection = nextProps ? nextProps.stories : stories;
            Object.keys(collection).some((sprintKey) => {
                collection[sprintKey].some((story) => {
                    if (story.id === cardId) {
                        card = story;
                        return true;
                    }
                })

                if (card) {
                    return true;
                }
            })
            break;
        }
        case 'task': {
            const collection = nextProps ? nextProps.tasks : tasks;
            Object.keys(collection).some((storyKey) => {
                Object.keys(collection[storyKey]).some((statusKey) => {
                    (collection[storyKey][statusKey] || []).some((task) => {
                        if (task.id === cardId) {
                            card = task;
                            return true;
                        }
                    })

                    if (card) {
                        return true;
                    }
                })

                if (card) {
                    return true;
                }
            })
            break;
        }
        }

        return card;
    }

    render() {
        const { title, description, assigned, statusId, pointId, isCodeMirrorFocus } = this.state;
        const { cardId, dimmer, open, isEdit, mode, stories, tasks } = this.props;

        const ref = open ? this.handleRef : null;

        const memberOptions = (this.props.members || []).map((item) => {
            return { value: item.id, label: item.name };
        })
        const statusOptions = (this.props.cardStatuses || []).map((item) => {
            return { value: item.id, label: item.status };
        })
        const pointOptions = (this.props.points || []).map((item) => {
            return { value: item.id, label: item.point.toFixed(1) };
        })

        if (!open) {
            return null;
        }

        const card = cardId ? this.findCard(mode, cardId) : {
            id: null,
            title: null,
            description: null
        }

        let comments = []
        if (card && 'comments' in card) {
            comments = card.comments;
        }

        let descriptionStyle = {
            padding: '0em',
            borderBottom: '0px'
        }
        if (isEdit && isCodeMirrorFocus) {
            descriptionStyle = codeMirrorFocusSegmentStyle;
        } else if(isEdit) {
            descriptionStyle = codeMirrorNonFocusSegmentStyle;
        }

        return (
            <div>
                <Modal dimmer={dimmer} open={open}>
                    <Modal.Header style={{padding: '1.25rem 1.5rem'}}>
                        {this.renderHeader()}
                    </Modal.Header>
                    <Modal.Content scrolling>
                        <Modal.Description>
                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column width={11}>
                                        <Header as='h3' dividing>
                                            <Icon name='file text outline' />
                                            <Header.Content>
                                                Description
                                            </Header.Content>
                                        </Header>
                                        <Segment style={descriptionStyle} vertical>
                                            {this.renderDescription()}
                                        </Segment>

                                        <Header as='h3' dividing>
                                            <Icon name='comments outline' />
                                            <Header.Content>
                                                Comments
                                            </Header.Content>
                                        </Header>
                                        <CardComment mode={mode} card={card} comments={comments} />
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <Grid columns={2} verticalAlign='middle' style={{marginTop: '0px'}}>
                                            <Grid.Row style={{padding: '0px'}}>
                                                <Grid.Column width={6}>
                                                    <Header as='h5'>Assign</Header>
                                                </Grid.Column>
                                                <Grid.Column width={10} style={{padding: '0px'}}>
                                                    <CustomSimpleDropdown
                                                        placeholder='Select Member'
                                                        options={memberOptions}
                                                        onChange={this.onChangeCardAssigned}
                                                        value={assigned}
                                                    />
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row style={{padding: '0px'}}>
                                                <Grid.Column width={6}>
                                                    <Header as='h5'>Status</Header>
                                                </Grid.Column>
                                                <Grid.Column width={10} style={{padding: '0px'}}>
                                                    <CustomSimpleDropdown
                                                        placeholder='Select status'
                                                        options={statusOptions}
                                                        onChange={this.onChangeCardStatus}
                                                        value={statusId}
                                                    />
                                                </Grid.Column>
                                            </Grid.Row>
                                            { mode === 'story' &&
                                                <Grid.Row style={{padding: '0px'}}>
                                                    <Grid.Column width={6}>
                                                        <Header as='h5'>Point</Header>
                                                    </Grid.Column>
                                                    <Grid.Column width={10} style={{padding: '0px'}}>
                                                        <CustomSimpleDropdown
                                                            placeholder='Select Point'
                                                            options={pointOptions}
                                                            onChange={this.onChangeCardPoint}
                                                            value={pointId}
                                                        />
                                                    </Grid.Column>
                                                </Grid.Row>
                                            }
                                        </Grid>
                                        <Header as='h3' dividing>
                                            <Icon name='attach' />
                                            <Header.Content>
                                                Files
                                            </Header.Content>
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Modal.Description>
                        <Modal.Description style={{marginTop: '1em'}}>
                        </Modal.Description>
                    </Modal.Content>
                    <Popup
                        trigger={
                            <Label as='a' floating onClick={this.onCancel}>
                                <Icon name="close" style={{margin: '0px'}} />
                            </Label>
                        }
                        content='Close Window (Ctrl+c)'
                        position='top center'
                        on='hover'
                    />
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, {
    addTask, updateTask, deleteTask,
    addStory, updateStory, deleteStory,
    switchEditModeCardInputForm, hideCardInputForm, switchConfirmDialog,
    changeCardAssigned, changeCardStatus, changeCardPoint
})(CardInputForm);