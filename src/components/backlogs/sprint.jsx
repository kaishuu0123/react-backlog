import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import moment from 'moment';
import {
    Segment,
    Header,
    List,
    Label,
    Button,
    Grid,
    Popup,
    Input
} from 'semantic-ui-react';
import { DateRangePicker } from 'react-dates';

import { showCardInputForm } from '../../actions/cardInputForm';
import StoryList from './storyList.jsx';
import { updateSprint } from '../../actions/sprint';

function mapStateToProps (state) {
    return {
        router: state.router,
        pointList: state.point
    }
}

class Sprint extends React.Component {
    constructor(props) {
        super(props);

        const { title, startDate, endDate } = props.sprint;

        this.state = {
            isEdit: false,
            title: title,
            startDate: startDate,
            endDate: endDate,
            focusedInput: null
        }

        this.showDialog = this.showDialog.bind(this);
        this.viewKanban = this.viewKanban.bind(this);
        this.editSprint = this.editSprint.bind(this);
        this.updateSprint = this.updateSprint.bind(this);
    }

    showDialog() {
        this.props.showCardInputForm(true, null, 'story', this.props.sprint.id);
    }

    viewKanban() {
        this.props.history.push('/kanban/' + this.props.sprint.id);
    }

    componentWillReceiveProps(props) {
        this.setDefaultState(
            props.sprint.title,
            props.sprint.startDate,
            props.sprint.endDate
        )
    }

    setDefaultState(title, startDate, endDate) {
        this.setState({
            title: title,
            startDate: startDate,
            endDate: endDate
        })
    }

    editSprint() {
        this.setState({
            isEdit: true
        })
    }

    updateSprint() {
        const { title, startDate, endDate } = this.state
        const { sprint } = this.props

        this.props.updateSprint(
            sprint.id,
            title,
            startDate,
            endDate
        )

        this.setState({
            isEdit: false
        })
    }

    renderSprintHeader() {
        const {
            sprint, stories
        } = this.props;
        const { title, startDate, endDate, isEdit } = this.state;

        const startDateId = `sprint_start_date_id_${sprint.id}`;
        const endDateId = `sprint_end_date_id_${sprint.id}`;

        return (
            <Grid.Row columns={3} verticalAlign='middle'>
                <Grid.Column width={5}>
                    { isEdit ? (
                        <Input
                            placeholder='Sprint Title'
                            onChange={(e) => this.setState({title: e.target.value})}
                            value={title}
                            fluid />
                    ) : (
                        <span style={{fontWeight: '700', fontSize: '1.1em', display: 'inline-block'}}>{sprint.title}</span>
                    )}
                </Grid.Column>
                { isEdit ? (
                        <Grid.Column width={9} textAlign='right'>
                            <DateRangePicker
                                startDate={this.state.startDate}
                                startDateId={startDateId}
                                endDate={this.state.endDate}
                                endDateId={endDateId}
                                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                                focusedInput={this.state.focusedInput}
                                onFocusChange={focusedInput => this.setState({ focusedInput })}
                                displayFormat="YYYY/MM/DD"
                                small
                            />
                        </Grid.Column>
                    ) : (
                        <Grid.Column width={8} textAlign='right' style={{padding: '0px'}}>
                            { startDate && endDate &&
                                <span>{startDate && startDate.format("YYYY/MM/DD")} 〜 {endDate && endDate.format("YYYY/MM/DD")}</span>
                            }
                        </Grid.Column>
                    )}
                { isEdit ? (
                    <Grid.Column width={2}>
                        <Popup
                            trigger={<Button compact size='mini' icon='save' circular floated="right" onClick={this.updateSprint} />}
                            content='Update Sprint'
                            position='top center'
                            on='hover'
                            />
                    </Grid.Column>
                ) : (
                    <Grid.Column width={3}>
                        { sprint.id !== 1 &&
                            <Popup
                                trigger={<Button compact size='mini' icon='edit' circular floated="right" onClick={this.editSprint}/>}
                                content='Edit Sprint'
                                position='top center'
                                />
                        }
                        { sprint.id !== 1 &&
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
                )}
            </Grid.Row>
        )
    }

    render() {
        const {
            sprint, stories, pointList
        } = this.props;

        const pointFindFunc = (story) => {
            const point = pointList.find((point) => point.id === story.pointId)
            if (point) {
                return point.point
            }
            return null;
        }

        const totalStoryCount = stories.length;
        const totalStoryPoint = stories.map((story) => ( pointFindFunc(story) || 0)).reduce((prevPoint, curPoint) => {
            return prevPoint + curPoint;
        }, 0);

        return (
            <Segment.Group>
                <Segment color='grey'>
                    <Grid>
                        {this.renderSprintHeader()}
                    </Grid>
                </Segment>
                <Segment style={{padding: '0px'}}>
                    <StoryList sprintId={sprint.id} stories={stories} />
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

export default connect(mapStateToProps, { showCardInputForm, updateSprint })(withRouter(Sprint));