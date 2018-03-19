function changeStateSuccess(newStoryId, task, afterState, index) {
    return {
        type: 'TASK_STATE_CHANGED',
        payload: {
            newStoryId: newStoryId,
            task: task,
            afterState: afterState,
            index: index
        }
    }
}

function addTaskSuccess(storyId, taskTitle, taskDescription, assigned, statusId, pointId) {
    return {
        type: 'ADD_TASK',
        payload: {
            storyId: storyId,
            title: taskTitle,
            description: taskDescription,
            assigned: assigned,
            statusId: statusId,
            pointId: pointId
        }
    }
}

export function changeTaskState(storyId, taskId, afterState, index) {
    return (dispatch) => {
        return (
            dispatch(changeStateSuccess(storyId, taskId, afterState, index))
        );
    }
}

export function addTask(storyId, taskTitle, taskDescription, assigned, statusId, pointId) {
    return (dispatch) => {
        return (
            dispatch(addTaskSuccess(storyId, taskTitle, taskDescription, assigned, statusId, pointId))
        );
    }
}

export function changeTaskSortOrder (srcTask, dstTask, statusId, dragIndex, hoverIndex) {
    return {
        type: 'CHANGE_TASK_SORT_ORDER',
        payload: {
            srcTask: srcTask,
            dstTask: dstTask,
            statusId: statusId,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex,
        }
    }
}

export function attachToStatusColumn (srcTask, srcTaskIndex, dstColumn) {
    return {
        type: 'ATTACH_TO_STATUS_COLUMN',
        payload: {
            srcTask: srcTask,
            srcTaskIndex: srcTaskIndex,
            dstColumn: dstColumn,
        }
    }
}

export function updateTask(storyId, task, title, description) {
    return {
        type: 'UPDATE_TASK',
        payload: {
            storyId: storyId,
            task: task,
            title: title,
            description: description
        }
    }
}

export function deleteTask(task) {
    return {
        type: 'DELETE_TASK',
        payload: {
            task: task
        }
    }
}

export function addCommentToTask(card, body) {
    return {
        type: 'ADD_COMMENT_TO_TASK',
        payload: {
            card: card,
            body: body
        }
    }
}