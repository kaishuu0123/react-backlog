'use strict';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DragLayer from 'react-dnd/lib/DragLayer';

import {
    List,
    Label
} from 'semantic-ui-react';

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '350px',
    opacity: 0.8,
};

function mapStateToProps(state) {
    return {
        pointList: state.point
    }
}

function collectPreview (monitor) {
    var item = monitor.getItem();
    return {
        item: item,
        itemType: monitor.getItemType(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    };
}

function getItemStyles (props) {
    const { currentOffset } = props;
    if (!currentOffset) {
        return {
            display: 'none'
        };
    }

    // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
    const { x, y } = currentOffset;
    var transform = `translate(${x}px, ${y}px)`;

    return {
        transform: transform,
        WebkitTransform: transform
    };
}

class StoryItemPreview extends React.Component {
    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(type, item) {
        const story = item.story;
        const pointObj = this.props.pointList.find((item) => {
            return item.id === story.pointId
        });

        return (
            <div className="item">
                { pointObj != null &&
                    <List.Content floated='right'>
                        <Label size='mini' horizontal circular>{pointObj.point.toFixed(1)}</Label>
                    </List.Content>
                }
                <List.Content>
                    <Label basic color='blue' size='mini' horizontal>#{story.id}</Label>
                    {story.title}
                </List.Content>
            </div>
        );
    }

    render() {
        const { item, itemType, isDragging } = this.props

        if (!isDragging) {
            return null;
        }


        return (
            <div style={layerStyles}>
                <List style={getItemStyles(this.props)}>
                    {this.renderItem(itemType, item)}
                </List>
            </div>
        );
    }
}

StoryItemPreview = DragLayer(collectPreview)(StoryItemPreview);
export default connect(mapStateToProps, {})(StoryItemPreview);