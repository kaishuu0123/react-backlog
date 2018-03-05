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

function addTaskSuccess(storyId, taskTitle, taskDescription, state) {
    return {
        type: 'ADD_TASK',
        payload: {
            storyId: storyId,
            taskTitle: taskTitle,
            taskDescription: taskDescription
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

export function addTask(storyId, taskTitle, taskDescription) {
    return (dispatch) => {
        return (
            dispatch(addTaskSuccess(storyId, taskTitle, taskDescription))
        );
    }
}

export function changeTaskSortOrder (srcTask, dstTask, status, dragIndex, hoverIndex) {
    return {
        type: 'CHANGE_TASK_SORT_ORDER',
        payload: {
            srcTask: srcTask,
            dstTask: dstTask,
            status: status,
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