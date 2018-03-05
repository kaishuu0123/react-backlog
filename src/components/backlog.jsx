import React from 'react';
import { connect } from 'react-redux';
import GlobalHeader from './header.jsx';
import {
    Container,
    Grid,
    Header
} from 'semantic-ui-react';
import withDragDropContext from '../lib/withDragDropContext';
import Sprint from './backlogs/sprint.jsx';
import CardInputForm from './common/cardInputForm.jsx';
import StoryItemPreview from './backlogs/storyItemPreview.jsx';
import { changeStorySortOrder } from '../actions/story';

function mapStateToProps(state) {
    return {
        sprints: state.sprint,
        stories: state.story,
        cardInputForm: state.cardInputForm
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
                <GlobalHeader />
                <div style={{margin: '1em', marginTop: '4em'}}>
                    <Header as='h1' dividing>
                        Backlog
                    </Header>
                    <Grid columns={2}>
                        <Grid.Column>
                            {excludedBacklogSprints.map((sprint, index) => (
                                <Sprint key={index} sprintTitle={sprint.sprintTitle} sprintId={sprint.id} stories={stories[sprint.id]} />
                            ))}
                        </Grid.Column>
                        <Grid.Column>
                            <Sprint sprintTitle='Backlogs' sprintId={1} stories={stories[1]} />
                        </Grid.Column>
                    </Grid>
                    <CardInputForm {...this.props.cardInputForm} />
                    <StoryItemPreview />
                </div>
            </div>
        );
    }
}

Backlog = connect(mapStateToProps, { changeStorySortOrder })(Backlog);
export default withDragDropContext(Backlog);
