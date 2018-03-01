const INITIAL_STATE = {
    1: {
        'New': [
            {
                storyId: 1,
                id: 3,
                title: 'Task1',
                description: 'text of Task1',
                status: 'New'
            },
            {
                storyId: 1,
                id: 4,
                title: 'Task2',
                description: 'text of Task2',
                status: 'New'
            }
        ]
    },
    2: {
        'New': [
            {
                storyId: 2,
                id: 5,
                title: '本番デプロイ',
                description: '本番環境にデプロイする',
                status: 'New'
            },
            {
                storyId: 2,
                id: 6,
                title: '結構長め長め長め長め長めのタスク名',
                description: '本番環境にデプロイする',
                status: 'New'
            }
        ]
    }
}

function get(p, o) {
    return p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o);
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'ADD_TASK': {
            const newState = Object.assign({}, state);
            const { storyId, taskTitle, taskDescription } = action.payload;
            let maxId = 0;
            const flattened = [].concat.apply([], Object.values(newState));

            Object.keys(newState).forEach((key) => {
                [].concat.apply([], Object.values(newState[key])).forEach((task) => {
                    maxId = Math.max(task.id, maxId);
                });
            });

            if (!(storyId in newState)) {
                newState[storyId] = [];
            }

            newState[storyId]['New'].push({
                storyId: storyId,
                id: maxId + 1,
                title: taskTitle,
                description: taskDescription,
                status: 'New'
            });
            return {
                ...state,
                [storyId]: {
                    'New': [
                        ...newState[storyId]['New']
                    ],
                    ...state[storyId],
                }
            };
        }
        case 'CHANGE_TASK_SORT_ORDER': {
            const { srcTask, dstTask, status, dragIndex, hoverIndex } = action.payload;
            const newState = Object.assign({}, state);

            const srcStoryId = srcTask.storyId;
            const dstStoryId = dstTask.storyId;

            if (srcStoryId !== dstStoryId) {
                const srcTasks = (get([srcStoryId, srcTask.status], newState) || []);
                const dstTasks = (get([dstStoryId, status], newState) || []);
                const [removed] = srcTasks.splice(dragIndex, 1);
                removed.storyId = dstStoryId;
                removed.status = status;
                dstTasks.splice(hoverIndex, 0, removed);

                return {
                    ...state,
                    [srcStoryId]: {
                        [srcTask.status]: [
                            ...srcTasks
                        ],
                        ...state[srcStoryId]
                    },
                    [dstStoryId]: {
                        [status]: [
                            ...dstTasks
                        ],
                        ...state[dstStoryId]
                    }
                };
            } else {
                const [removed] = (get([srcStoryId, srcTask.status], newState) || []).splice(dragIndex, 1);
                removed.status = status;
                newState[srcStoryId][status].splice(hoverIndex, 0, removed);

                return {
                    ...state,
                    [srcStoryId]: {
                        [srcTask.status]: [
                            ...newState[srcStoryId][status]
                        ],
                        ...state[srcStoryId]
                    }
                }
            }
        }
        case 'ATTACH_TO_STATUS_COLUMN': {
            const { srcTask, srcTaskIndex, dstColumn } = action.payload;
            const newState = Object.assign({}, state);

            const srcStoryId = srcTask.storyId;

            const srcTasks = (get([srcStoryId, srcTask.status], newState) || []);
            const dstTasks = (get([dstColumn.storyId, dstColumn.status], newState) || []);
            const [removed] = srcTasks.splice(srcTaskIndex, 1);
            removed.storyId = dstColumn.storyId;
            removed.status = dstColumn.status;
            dstTasks.splice(0, 0, removed);

            return {
                ...state,
                [srcStoryId]: {
                    [srcTask.status]: [
                        ...srcTasks
                    ],
                    ...state[srcStoryId]
                },
                [dstColumn.storyId]: {
                    [dstColumn.status]: [
                        ...dstTasks
                    ],
                    ...state[dstColumn.storyId]
                }
            };
        }
        default:
            return state;
    }
}