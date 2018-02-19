const INITIAL_STATE = [
    {
        storyId: 1,
        id: 3,
        title: 'Task1',
        body: 'text of Task1',
        state: 'New'
    },
    {
        storyId: 1,
        id: 4,
        title: 'Task2',
        body: 'text of Task2',
        state: 'New'
    },
    {
        storyId: 2,
        id: 5,
        title: '本番デプロイ',
        body: '本番環境にデプロイする',
        state: 'New'
    },
    {
        storyId: 2,
        id: 6,
        title: '結構長め長め長め長め長めのタスク名',
        body: '本番環境にデプロイする',
        state: 'New'
    }
]

export default function (state = INITIAL_STATE, action) {
    let newState = null;

    switch(action.type) {
        case 'TASK_STATE_CHANGED':
            newState = [...state];
            const targetTask = newState.find(task => {
                return action.payload.taskId == task.id;
            });
            targetTask.state = action.payload.afterState;
            targetTask.storyId = action.payload.storyId;
            return newState;
        case 'ADD_TASK':
            newState = [...state];
            let maxId = 0;
            newState.forEach(function(val, index) {
                maxId = Math.max(val.id, maxId);
            });
            newState.push({
                storyId: action.payload.storyId,
                id: maxId + 1,
                title: action.payload.taskTitle,
                body: action.payload.taskDescription,
                state: 'New'
            });
            return newState;
        default:
            return state;
    }
}