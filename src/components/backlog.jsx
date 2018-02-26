import React from 'react';
import { connect } from 'react-redux';
import Header from './header.jsx';
import {
    Container,
    Grid,
} from 'semantic-ui-react';
import withDragDropContext from '../lib/withDragDropContext';
import Sprint from './backlogs/sprint.jsx';
import StoryInputDialog from './backlogs/storyInputDialog.jsx';
import StoryItemPreview from './backlogs/storyItemPreview.jsx';
import { changeStorySortOrder } from '../actions/story';

function mapStateToProps(state) {
    return {
        sprints: state.sprint,
        stories: state.story,
        storyInputDialog: state.storyInputDialog
    };
}

class Backlog extends React.Component {
    constructor(props) {
        super(props);
        this.getStories = this.getStories.bind(this);
    }

    getStories(sprintId) {
        return this.props.stories.filter((story, index) => {
            return story.sprintId === sprintId;
        })
    }

    render() {
        const { sprints, stories } = this.props;
        const excludedBacklogSprints = sprints.filter((sprint) => {
            return sprint.id !== 1;
        });

        return (
            <div>
                <Header />
                <Grid columns={2} style={{margin: '1em'}}>
                    <Grid.Column>
                        {excludedBacklogSprints.map((sprint, index) => (
                            <Sprint key={index} sprintTitle={sprint.sprintTitle} sprintId={sprint.id} stories={stories[sprint.id]} />
                        ))}
                    </Grid.Column>
                    <Grid.Column>
                        <Sprint sprintTitle='Backlogs' sprintId={1} stories={stories[1]} />
                    </Grid.Column>
                </Grid>
                <StoryInputDialog {...this.props.storyInputDialog} />
                <StoryItemPreview />
            </div>
        );
    }
}

Backlog = connect(mapStateToProps, { changeStorySortOrder })(Backlog);
export default withDragDropContext(Backlog);
