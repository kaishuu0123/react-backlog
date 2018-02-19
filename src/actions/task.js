function changeStateSuccess(storyId, taskId, afterState, index) {
    return {
        type: 'TASK_STATE_CHANGED',
        payload: {
            storyId: storyId,
            taskId: taskId,
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