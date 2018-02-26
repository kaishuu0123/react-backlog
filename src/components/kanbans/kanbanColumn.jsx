import React from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { changeTaskState } from '../../actions/task';

import { Ref, Table, Card, Image } from 'semantic-ui-react';

const stateTarget = {
    drop(props, monitor, component) {
        props.changeTaskState(
            props.storyId,
            monitor.getItem().task.id,
            props.state,
        );
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

const mapStateToProps = (state) => ({

});

class KanbanColumn extends React.Component {
    constructor(props) {
        super(props);
    }

    renderOverlay(color) {
        return (
            <div style={{
                width: '100%',
                height: '100px',
                opacity: 0.2,
                backgroundColor: color,
            }} />
        );
    }

    render() {
        const { connectDropTarget, isOver } = this.props;
        return(
            <Ref innerRef={(ref) => {
                connectDropTarget(ref);
            }}>
                <Table.Cell>
                    {this.props.children}
                    {isOver && this.renderOverlay('gray')}
                </Table.Cell>
            </Ref>
        );
    }
}

KanbanColumn = DropTarget('task', stateTarget, collect)(KanbanColumn);
export default connect(mapStateToProps, { changeTaskState })(KanbanColumn)