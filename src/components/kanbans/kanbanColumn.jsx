import React from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { attachToStatusColumn } from '../../actions/task';

import { Ref, Table, Card, Image } from 'semantic-ui-react';

const stateTarget = {
    drop(props, monitor, component) {
		const dragIndex = monitor.getItem().index
        const hoverIndex = props.index;
        const srcTask = monitor.getItem().task;
        const dstColumn = props;

        if (!props.tasks.length) {
            props.attachToStatusColumn(srcTask, monitor.getItem().index, dstColumn, dragIndex)
        }
    },
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        overItem: monitor.getItem()
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
        const { tasks, connectDropTarget, isOver, overItem, storyId, status } = this.props;

        let isRenderOverlay = false;
        if (isOver && (tasks || []).length == 0) {
            isRenderOverlay = true;
        }

        return(
            <Ref innerRef={(ref) => {
                connectDropTarget(ref);
            }}>
                <Table.Cell>
                    {isRenderOverlay && this.renderOverlay('gray')}
                    {this.props.children}
                </Table.Cell>
            </Ref>
        );
    }
}

KanbanColumn = DropTarget('task', stateTarget, collect)(KanbanColumn);
export default connect(mapStateToProps, { attachToStatusColumn })(KanbanColumn)