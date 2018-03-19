import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { Ref, Card, Image, Icon, Grid } from 'semantic-ui-react';
import catPng from '../../images/cat.png';
import octCatSvg from '../../images/octcat.svg';
import { changeTaskSortOrder } from '../../actions/task';
import { showCardInputForm } from '../../actions/cardInputForm';

function mapStateToProps() {
    return {

    };
}

const taskSource = {
    beginDrag(props) {
        return {
            task: props.task,
            status: props.status,
            index: props.index
        };
    },
    isDragging(props, monitor) {
        return props.task.id === monitor.getItem().task.id;
    },
};

const taskTarget = {
    hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index
        const hoverIndex = props.index
        const srcTask = monitor.getItem().task;
        const dstTask = props.task;
        const status = dstTask.status;

		// Don't replace items with themselves
		if (srcTask.id === dstTask.id) {
			return
        }

        if (srcTask.status !== dstTask.status) {
            return
        }

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
        }
    },
    drop(props, monitor, component) {
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index
        const srcTask = monitor.getItem().task;
        const dstTask = props.task;
        const statusId = dstTask.statusId;

        // Time to actually perform the action
		props.changeTaskSortOrder(srcTask, dstTask, statusId, dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex
    }
}

function taskSourceCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

function taskTargetCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        clientOffset: monitor.getClientOffset(),
        sourceClientOffset: monitor.getClientOffset(),
        overItem: monitor.getItem()
    };
}

class TaskCard extends React.Component {
    constructor(props) {
        super(props)

        this.showDialog = this.showDialog.bind(this);
    }

    renderOverlay(color) {
        return (
            <div style={{
                width: '100%',
                height: '100px',
                opacity: 0.4,
                backgroundColor: color,
            }} />
        );
    }

    displayStyle(isDragging) {
        return isDragging ? { display: 'none' } : { display : 'block' };
    }

    showDialog() {
        const { task } = this.props;
        this.props.showCardInputForm(false, task.id, 'task', task.storyId);
    }

    render() {
        const {
            task, index,
            connectDragSource, isDragging,
            connectDropTarget, isOver, clientOffset, sourceClientOffset, overItem
        } = this.props;

        let isRenderOverlay = false;
        if (isOver && overItem && overItem.task.id !== task.id) {
            isRenderOverlay = true;
        }
        const cardStyle = {
            marginBottom: '10px',
            width: 'auto',
            userSelect: 'text',
            ...this.displayStyle(isDragging)
        }

        return(
            connectDragSource(connectDropTarget(
                <div onClick={this.showDialog}>
                    { isOver && this.renderOverlay('gray') }
                    <Card key={index} style={cardStyle}>
                        <Card.Content style={this.displayStyle(isDragging)}>
                            <Card.Header style={{fontWeight: '100', fontSize: '0.9em', color: 'rgba(0,0,0,.68)'}}>#{task.id}</Card.Header>
                            <Card.Description style={{fontWeight: '500', fontSize: '1.1em', color: 'rgba(0,0,0,255)'}}>{task.title}</Card.Description>
                        </Card.Content>
                        <Card.Content extra style={this.displayStyle(isDragging)}>
                            <Image size='mini' style={{width:'20px', height:'20px', margin: '0px'}} src={octCatSvg} />
                            <span className="right floated">
                                { task.comments &&
                                    <span>
                                        <Icon name="comment outline" />
                                        {task.comments.length}
                                    </span>
                                }
                                <Icon name="attach" />
                                1
                            </span>
                        </Card.Content>
                    </Card>
                </div>
            ))
        );
    }
}

TaskCard = DragSource('task', taskSource, taskSourceCollect)(TaskCard);
TaskCard = DropTarget('task', taskTarget, taskTargetCollect)(TaskCard);
export default connect(mapStateToProps, { changeTaskSortOrder, showCardInputForm })(TaskCard);