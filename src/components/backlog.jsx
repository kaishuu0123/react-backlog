import React from 'react';
import { connect } from 'react-redux';
import GlobalHeader from './header.jsx';
import {
    Container,
    Grid,
    Header,
    Button
} from 'semantic-ui-react';
import withDragDropContext from '../lib/withDragDropContext';
import Sprint from './backlogs/sprint.jsx';
import CardInputForm from './common/cardInputForm.jsx';
import StoryItemPreview from './backlogs/storyItemPreview.jsx';
import { changeStorySortOrder } from '../actions/story';
import { addSprint } from '../actions/sprint';

function mapStateToProps(state) {
    return {
        sprints: state.sprint,
        stories: state.story,
        cardInputForm: state.cardInputForm,
        member: state.member,
        cardStatus: state.cardStatus,
        point: state.point
    };
}

class Backlog extends React.Component {
    constructor(props) {
        super(props);

        this.addSprint = this.addSprint.bind(this);
    }

    addSprint() {
        this.props.addSprint();
    }

    render() {
        const { sprints, stories } = this.props;
        const excludedBacklogSprints = sprints.filter((sprint) => {
            return sprint.id !== 1;
        });
        const backlogSprint = sprints.filter((sprint) => {
            return sprint.id === 1;
        })[0];

        return (
            <div>
                <GlobalHeader />
                <div style={{margin: '1em', marginTop: '4em'}}>
                    <Header as='h1' dividing>
                        Backlog
                    </Header>
                    <Button compact color='blue' content='Add sprint' onClick={this.addSprint} />
                    <Grid columns={2}>
                        <Grid.Column>
                            {excludedBacklogSprints.map((sprint, index) => (
                                <Sprint key={index} sprint={sprint} stories={stories[sprint.id]} isDialogOpen={this.props.cardInputForm.open} currentCardDialog={this.props.cardInputForm.card} />
                            ))}
                        </Grid.Column>
                        <Grid.Column>
                            <Sprint sprint={backlogSprint} stories={stories[1]} />
                        </Grid.Column>
                    </Grid>
                    <CardInputForm
                        {...this.props.cardInputForm}
                        cardStatuses={this.props.cardStatus}
                        members={this.props.member}
                        points={this.props.point}
                    />
                    <StoryItemPreview />
                </div>
            </div>
        );
    }
}

Backlog = connect(mapStateToProps, { addSprint, changeStorySortOrder })(Backlog);
export default withDragDropContext(Backlog);
