import React from 'react';
import Header from './header.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Table } from 'semantic-ui-react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { default as TouchBackend } from 'react-dnd-touch-backend';

import KanbanColumn from './kanbans/kanbanColumn.jsx';
import StoryCard from './kanbans/storyCard.jsx';
import TaskCard from './kanbans/taskCard.jsx';
import AddTaskCardButton from './kanbans/addTaskCardButton.jsx';
import { default as CardPreview } from './kanbans/CardPreview.jsx';
import { default as CardInputForm } from './kanbans/cardInputForm.jsx';

import 'semantic-ui-css/semantic.min.css';

function mapStateToProps(state) {
    return {
        tasks: state.task,
        stories: state.story,
        cardInputForm: state.cardInputForm,
    };
}

class Kanban extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            states: [
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

        const stories = this.props.stories.filter((story, index) => {
            return params.sprintId == story.sprintId;
        });

        return(
            <div>
                <Header />
                <Table celled size='small' unstackable attached='top'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell style={{width: '200px'}} />
                            {this.state.states.map((state, index) => (
                                <Table.HeaderCell key={index} style={{width: '200px'}}>{state}</Table.HeaderCell>
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
                                {this.state.states.map((state, index) => (
                                    <KanbanColumn key={index} state={state} storyId={story.id}>
                                        {this.props.tasks.filter((task) => task.state == state && task.storyId == story.id).map((task, index) => (
                                            <TaskCard key={index} task={task} index={index} />
                                        ))}
                                        {index == 0 &&
                                            <CardInputForm {...this.props.cardInputForm} storyId={story.id} />
                                        }
                                    </KanbanColumn>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <CardPreview key="__preview" />
            </div>
        )
    }
}

Kanban = DragDropContext(TouchBackend({ enableMouseEvents: true }))(Kanban);
export default connect(mapStateToProps)(withRouter(Kanban));