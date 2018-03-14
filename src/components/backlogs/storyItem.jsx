import React from 'react';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import {
    List,
    Label,
    Ref,
} from 'semantic-ui-react';
import { changeStorySortOrder } from '../../actions/story';
import { showCardInputForm } from '../../actions/cardInputForm';

function mapStateToProps(state) {
    return {
        pointList: state.point
    }
}

const storySource = {
    beginDrag(props, monitor, component) {
        return {
            story: props.story,
            index: props.index,
        };
    },
    isDragging(props, monitor) {
        return props.story.id === monitor.getItem().story.id;
    },
};

const storyTarget = {
    hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index
        const hoverIndex = props.index
        const srcStory = monitor.getItem().story;
        const dstStory = props.story;

		// Don't replace items with themselves
		if (srcStory.id === dstStory.id) {
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

        // Time to actually perform the action
		props.changeStorySortOrder(srcStory.id, dstStory.id, dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex
    },
    drop(props, monitor, component) {
    }
}

function storyCollectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}

function storyCollectTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        clientOffset: monitor.getClientOffset(),
        sourceClientOffset: monitor.getClientOffset()
    };
}

class StoryItem extends React.Component {
    constructor(props) {
        super(props);

        this.showDialog = this.showDialog.bind(this);
    }

    renderOverlay(color) {
        return (
            <div style={{
                width: '100%',
                height: '30px',
                opacity: 0.4,
                backgroundColor: color,
            }} />
        );
    }

    displayStyle(isDragging) {
        return isDragging ? { display: 'none' } : { display : 'inline' };
    }

    showDialog() {
        const { story } = this.props;
        this.props.showCardInputForm(false, story, 'story', story.sprintId)
    }

    render() {
        const {
            story, index,
            connectDragSource, isDragging,
            connectDropTarget, isOver, clientOffset, sourceClientOffset,
            pointList
        } = this.props;

        const pointObj = pointList.find((item) => {
            return item.id === story.pointId
        });

        return (
            connectDragSource(connectDropTarget(
                <div className="item" onClick={this.showDialog}>
                    { isOver && this.renderOverlay('gray') }
                    { pointObj != null &&
                        <List.Content floated='right' style={this.displayStyle(isDragging)}>
                            <Label size='mini' horizontal circular>{pointObj && pointObj.point.toFixed(1)}</Label>
                        </List.Content>
                    }
                    <List.Content style={this.displayStyle(isDragging)}>
                        <Label basic color='blue' size='mini' horizontal>#{story.id}</Label>
                        {story.title}
                    </List.Content>
                </div>
            ))
        )
    }
}
StoryItem = DragSource('story', storySource, storyCollectSource)(StoryItem);
StoryItem = DropTarget('story', storyTarget, storyCollectTarget)(StoryItem);
export default connect(mapStateToProps, { changeStorySortOrder, showCardInputForm })(StoryItem);