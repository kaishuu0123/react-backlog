import React from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

import { Ref, List } from 'semantic-ui-react';
import StoryItem from './storyItem.jsx';
import { attachToList } from '../../actions/story';

const mapStateToProps = (state) => ({
});

const listTarget = {
    hover(props, monitor) {
        const targetSprintId = props.sprintId;
        const sourceProps = monitor.getItem();
        const sourceStoryId = sourceProps.story.id;
        const sourceStoryIndex = sourceProps.index;

        if (!props.stories.length) {
            props.attachToList(targetSprintId, sourceStoryId, sourceStoryIndex);
        }
    },
};

function storyCollectTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
}

class StoryList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            sprintId,
            stories,
            connectDropTarget, isOver
        } = this.props;

        let listStyle = {
            minHeight: '30px',
            backgroundColor: 'white'
        }

        let backgroundColor = 'white';
        if (isOver && stories.length == 1) {
            listStyle.backgroundColor = 'gray';
            listStyle.opacity = '0.4';
        }

        return(
            <Ref innerRef={(ref) => {
                connectDropTarget(ref)
            }}>
                <List celled　verticalAlign='middle' relaxed style={listStyle}>
                    {
                        stories.map((story, index) => (
                            <StoryItem key={index} index={index} story={story} />
                        ))
                    }
                </List>
            </Ref>
        );
    }
}

StoryList = DropTarget('story', listTarget, storyCollectTarget)(StoryList);
export default connect(mapStateToProps, { attachToList })(StoryList)