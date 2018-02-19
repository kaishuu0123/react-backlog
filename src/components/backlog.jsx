import React from 'react';
import { connect } from 'react-redux';
import Header from './header.jsx';
import {
    Container,
    Grid,
    Segment,
} from 'semantic-ui-react';
import Sprint from './backlogs/sprint.jsx';
import StoryInputDialog from './backlogs/storyInputDialog.jsx';

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
        return (
            <div>
                <Header />
                <Grid columns={2} style={{margin: '1em'}}>
                    <Grid.Column>
                        {this.props.sprints.map((sprint, index) => (
                            <Sprint key={index} sprintTitle={sprint.sprintTitle} sprintId={sprint.id} stories={this.getStories(sprint.id)} />
                        ))}
                    </Grid.Column>
                    <Grid.Column>
                        <Sprint sprintTitle='Backlogs' stories={this.getStories(null)} />
                    </Grid.Column>
                </Grid>

                <StoryInputDialog {...this.props.storyInputDialog}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, {})(Backlog);