import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
    Segment,
    Header,
    List,
    Label,
    Button,
    Grid,
    Popup
} from 'semantic-ui-react';

import { showStoryInputDialog } from '../../actions/storyInputDialog';
import StoryList from './storyList.jsx';

function mapStateToProps (state) {
    return {
        router: state.router,
    }
}

class Sprint extends React.Component {
    constructor(props) {
        super(props);

        this.showDialog = this.showDialog.bind(this);
        this.viewKanban = this.viewKanban.bind(this);
    }

    showDialog() {
        this.props.showStoryInputDialog(this.props.sprintId);
    }

    viewKanban() {
        this.props.history.push('/kanban/' + this.props.sprintId);
    }

    render() {
        const {
            sprintId, sprintTitle, stories
        } = this.props;

        const totalStoryCount = stories.length;
        const totalStoryPoint = stories.map((story) => (story.point || 0)).reduce((prevPoint, curPoint) => {
            return prevPoint + curPoint;
        }, 0);

        return (
            <Segment.Group>
                <Segment color='grey'>
                    <Grid>
                        <Grid.Row columns={3} verticalAlign='middle'>
                            <Grid.Column width={4}>
                                <span style={{fontWeight: '700', fontSize: '1.1em', display: 'inline-block'}}>{sprintTitle}</span>
                            </Grid.Column>
                            <Grid.Column width={9} textAlign='right' style={{padding: '0px'}}>
                                <span>2018/01/01 〜 2018/02/02</span>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                { sprintId !== 1 &&
                                    <Popup
                                        trigger={<Button compact size='mini' icon='grid layout' circular floated="right" onClick={this.viewKanban}/>}
                                        content='View Kanban'
                                        position='top center'
                                        />
                                }
                                <Popup
                                    trigger={<Button compact size='mini' icon='plus' circular floated="right" onClick={this.showDialog} />}
                                    content='Add Story'
                                    position='top center'
                                    on='hover'
                                    />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment style={{padding: '0px'}}>
                    <StoryList sprintId={sprintId} stories={stories}/>
                </Segment>
                <Segment secondary>
                    <Grid columns={3}>
                        <Grid.Row>
                            <Grid.Column>
                                Total
                            </Grid.Column>
                            <Grid.Column textAlign='right'>
                                {totalStoryCount} Stories
                            </Grid.Column>
                            <Grid.Column textAlign='right'>
                                {totalStoryPoint} points
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Segment.Group>
        )
    }
}

export default connect(mapStateToProps, { showStoryInputDialog })(withRouter(Sprint));