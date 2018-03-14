import React from 'react';
import GlobalHeader from './header.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Header, Table, Container, Button } from 'semantic-ui-react';

import withDragDropContext from '../lib/withDragDropContext';
import KanbanColumn from './kanbans/kanbanColumn.jsx';
import StoryCard from './kanbans/storyCard.jsx';
import TaskCard from './kanbans/taskCard.jsx';
import AddTaskCardButton from './kanbans/addTaskCardButton.jsx';
import { default as CardPreview } from './kanbans/CardPreview.jsx';
import { default as CardInputForm } from './common/cardInputForm.jsx';

function mapStateToProps(state) {
    return {
        sprint: state.sprint,
        tasks: state.task,
        stories: state.story,
        cardInputForm: state.cardInputForm,
        member: state.member,
        cardStatus: state.cardStatus,
        point: state.point
    };
}

class Kanban extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { params } = this.props.match;

        const stories = this.props.stories[params.sprintId];
        const {
            tasks, sprint,
            cardStatus
        } = this.props;

        const entry = sprint.find((entry) => {
            return Number(params.sprintId) === entry.id
        });
        const sprintTitle = entry.title;

        const columnWidth = parseInt(16 / (cardStatus.length + 1));
        const get = (p, o) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)

        return(
            <div>
                <GlobalHeader />
                <div style={{margin: '1em', marginTop: '4em'}}>
                    <Header as='h1' dividing>
                        {sprintTitle}
                    </Header>
                    <Table celled size='small' unstackable attached='top'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width={columnWidth} />
                                {cardStatus.map((status, index) => (
                                    <Table.HeaderCell key={index} width={columnWidth}>{status.status}</Table.HeaderCell>
                                ))}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {stories.map((story, index) => (
                                <Table.Row key={index} verticalAlign='top'>
                                    <Table.Cell>
                                        <StoryCard key={index} story={story} index={index} />
                                        <AddTaskCardButton storyId={story.id}/>
                                    </Table.Cell>
                                    {cardStatus.map((status, index) => (
                                        <KanbanColumn key={index} status={status} storyId={story.id} tasks={(get([story.id, status.id], tasks) || []).filter((task) => task.statusId === status.id)}>
                                            {(get([story.id, status.id], tasks) || []).filter((task) => task.statusId === status.id).map((task, index) => (
                                                <TaskCard key={index} task={task} index={index} status={status} />
                                            ))}
                                        </KanbanColumn>
                                    ))}
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    <CardInputForm
                        {...this.props.cardInputForm}
                        cardStatuses={this.props.cardStatus}
                        members={this.props.member}
                        points={this.props.point}
                    />
                    <CardPreview key="__preview" />
                </div>
            </div>
        )
    }
}

Kanban = withDragDropContext(Kanban);
export default connect(mapStateToProps)(withRouter(Kanban));