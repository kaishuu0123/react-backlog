'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import DragLayer from 'react-dnd/lib/DragLayer';
import { Ref, Card, Image, Icon, Grid } from 'semantic-ui-react';
import octCatSvg from '../../images/octcat.svg';

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
        const task = item.task;
        return (
            <Card key={0}>
                <Card.Content>
                    <span className="right floated">
                        <Icon name="edit"/>
                    </span>
                    <Card.Header style={{fontWeight: '100', fontSize: '0.9em', color: 'rgba(0,0,0,.68)'}}>#{task.id}</Card.Header>
                    <Card.Description style={{fontWeight: '500', fontSize: '1.1em', color: 'rgba(0,0,0,255)'}}>{task.title}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Image size='mini' style={{width:'20px', height:'20px', margin: '0px'}} src={octCatSvg} />
                    <span className="right floated">
                        <Icon name="file text outline" />
                        2
                        <Icon name="comment outline" />
                        1
                    </span>
                </Card.Content>
            </Card>
        );
    }

    render() {
        const { item, itemType, isDragging } = this.props

        if (!isDragging) {
            return null;
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