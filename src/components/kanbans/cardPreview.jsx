'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import DragLayer from 'react-dnd/lib/DragLayer';
import TaskCard from './taskCard.jsx';

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '180px',
    opacity: 0.8,
};

function collect (monitor) {
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

class CardPreview extends React.Component {
    renderItem(type, item) {
        return (
            <TaskCard task={item.task} key={0} index={0}></TaskCard>
        );
    }

    render() {
        const { item, itemType, isDragging } = this.props

        if (!isDragging) {
            return <div />;
        }

        return (
            <div style={layerStyles}>
                <div style={getItemStyles(this.props)}>
                {this.renderItem(itemType, item)}
                </div>
            </div>
        );
    }
}

CardPreview.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    currentOffset: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    isDragging: PropTypes.bool
};

export default DragLayer(collect)(CardPreview);