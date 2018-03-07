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
    };
}

class Kanban extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statuses: [
                'New',
                'In Progress',
                'Resolved',
                'Feedback',
                'Finish'
            ]
        }
    }

    render() {
        const { params } = this.props.match;

        const stories = this.props.stories[params.sprintId];
        const {
            tasks, sprint
        } = this.props;
        const {
            statuses
        } = this.state;

        const entry = sprint.find((entry) => {
            return Number(params.sprintId) === entry.id
        });
        const sprintTitle = entry.title;

        const columnWidth = parseInt(16 / (statuses.length + 1));
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
                                {statuses.map((status, index) => (
                                    <Table.HeaderCell key={index} width={columnWidth}>{status}</Table.HeaderCell>
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
                                    {statuses.map((status, index) => (
                                        <KanbanColumn key={index} status={status} storyId={story.id} tasks={(get([story.id, status], tasks) || []).filter((task) => task.status === status)}>
                                            {(get([story.id, status], tasks) || []).filter((task) => task.status === status).map((task, index) => (
                                                <TaskCard key={index} task={task} index={index} status={status} />
                                            ))}
                                        </KanbanColumn>
                                    ))}
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    <CardInputForm {...this.props.cardInputForm} />
                    <CardPreview key="__preview" />
                </div>
            </div>
        )
    }
}

Kanban = withDragDropContext(Kanban);
export default connect(mapStateToProps)(withRouter(Kanban));