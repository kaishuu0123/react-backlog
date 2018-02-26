import React from 'react';
import { DragSource } from 'react-dnd';
import { Ref, Card, Image, Icon, Grid } from 'semantic-ui-react';
import catPng from '../../images/cat.png';
import octCatSvg from '../../images/octcat.svg';

const taskSource = {
    beginDrag(props) {
        return {
            task: props.task,
            index: props.index
        };
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class TaskCard extends React.Component {
    render() {
        const { connectDragSource, isDragging } = this.props;
        return(
            <Ref innerRef={(ref) => {
                connectDragSource(ref);
            }}>
                <Card key={this.props.index} style={{width: 'auto', userSelect: 'text'}}>
                    <Card.Content>
                        <span className="right floated">
                            <Icon name="edit"/>
                        </span>
                        <Card.Header style={{fontWeight: '100', fontSize: '0.9em', color: 'rgba(0,0,0,.68)'}}>#{this.props.task.id}</Card.Header>
                        <Card.Description style={{fontWeight: '500', fontSize: '1.1em', color: 'rgba(0,0,0,255)'}}>{this.props.task.title}</Card.Description>
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
            </Ref>
        );
    }
}

export default DragSource('task', taskSource, collect)(TaskCard);
