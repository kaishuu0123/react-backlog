const INITIAL_STATE = {
    1: {
        1: [
            {
                storyId: 1,
                id: 3,
                title: 'Task1',
                description: 'text of Task1',
                statusId: 1
            },
            {
                storyId: 1,
                id: 4,
                title: 'Task2',
                description: 'text of Task2',
                statusId: 1
            }
        ]
    },
    2: {
        1: [
            {
                storyId: 2,
                id: 5,
                title: '本番デプロイ',
                description: '本番環境にデプロイする',
                statusId: 1
            },
            {
                storyId: 2,
                id: 6,
                title: '結構長め長め長め長め長めのタスク名',
                description: '結構長め長め長め長め長めのタスク名',
                statusId: 1
            }
        ]
    }
}

function findCard(parentId, cardId, tasks) {
    let card;
    Object.keys(tasks[parentId]).some((key) => {
        tasks[parentId][key].some((task) => {
            if (task.id === cardId) {
                card = task;
                return true;
            }
        })

        if (card) {
            return true;
        }
    })

    return card;
}

function get(p, o) {
    return p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o);
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'ADD_TASK': {
            const newState = Object.assign({}, state);
            const { storyId, title, description, assigned, statusId, pointId } = action.payload;
            let maxId = 0;
            const flattened = [].concat.apply([], Object.values(newState));

            Object.keys(newState).forEach((key) => {
                [].concat.apply([], Object.values(newState[key])).forEach((task) => {
                    maxId = Math.max(task.id, maxId);
                });
            });

            if (!(storyId in newState)) {
                newState[storyId] = { [statusId]: [] };
            }
            if (!newState[storyId][statusId]) {
                newState[storyId][statusId] = [];
            }

            newState[storyId][statusId].push({
                storyId: storyId,
                id: maxId + 1,
                title: title,
                description: description,
                assigned: assigned,
                statusId: statusId,
                pointId: pointId
            });
            return {
                ...state,
                [storyId]: {
                    [statusId]: [
                        ...newState[storyId][statusId]
                    ],
                    ...state[storyId],
                }
            };
        }
        case 'UPDATE_TASK': {
            const { storyId, task, title, description } = action.payload;
            const taskId = task.id;

            return {
                ...state,
                [storyId]: {
                    [task.statusId]: state[storyId][task.statusId].map((task) => {
                        if (task.id === taskId) {
                            return {
                                ...task,
                                title: title,
                                description: description
                            }
                        }
                        return { ...task }
                    })
                }
            }
        }
        case 'CHANGE_TASK_SORT_ORDER': {
            const { srcTask, dstTask, statusId, dragIndex, hoverIndex } = action.payload;
            const newState = Object.assign({}, state);

            const srcStoryId = srcTask.storyId;
            const dstStoryId = dstTask.storyId;
            const prevStatusId = srcTask.statusId;

            if (srcStoryId !== dstStoryId) {
                const srcTasks = (get([srcStoryId, srcTask.statusId], newState) || []);
                const dstTasks = (get([dstStoryId, statusId], newState) || []);
                const [removed] = srcTasks.splice(dragIndex, 1);
                removed.storyId = dstStoryId;
                removed.statusId = statusId;
                dstTasks.splice(hoverIndex, 0, removed);

                return {
                    ...state,
                    [srcStoryId]: {
                        [prevStatusId]: [
                            ...srcTasks
                        ],
                        ...state[srcStoryId]
                    },
                    [dstStoryId]: {
                        [statusId]: [
                            ...dstTasks
                        ],
                        ...state[dstStoryId]
                    }
                };
            } else {
                const [removed] = (get([srcStoryId, srcTask.statusId], newState) || []).splice(dragIndex, 1);
                removed.statusId = statusId;
                newState[srcStoryId][statusId].splice(hoverIndex, 0, removed);

                return {
                    ...state,
                    [srcStoryId]: {
                        [prevStatusId]: [
                            ...newState[srcStoryId][statusId]
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
            const prevStatusId = srcTask.statusId;

            const srcTasks = (get([srcStoryId, srcTask.statusId], newState) || []);
            const dstTasks = (get([dstColumn.storyId, dstColumn.status.id], newState) || []);
            const [removed] = srcTasks.splice(srcTaskIndex, 1);
            removed.storyId = dstColumn.storyId;
            removed.statusId = dstColumn.status.id;
            dstTasks.splice(0, 0, removed);

            return {
                ...state,
                [srcStoryId]: {
                    [prevStatusId]: [
                        ...srcTasks
                    ],
                    ...state[srcStoryId]
                },
                [dstColumn.storyId]: {
                    [dstColumn.status.id]: [
                        ...dstTasks
                    ],
                    ...state[dstColumn.storyId]
                }
            };
        }
        case 'DELETE_TASK': {
            const { task } = action.payload;
            const newState = Object.assign({}, state);

            newState[task.storyId][task.statusId] = newState[task.storyId][task.statusId].filter((item) => {
                return task.id !== item.id;
            });

            return {
                ...newState,
            }
        }
        case 'CHANGE_CARD_ASSIGNED': {
            const { mode, parentId, cardId, assigned } = action.payload;

            if (mode !== 'task') {
                return state;
            }

            const card = findCard(parentId, cardId, state);

            return {
                ...state,
                [card.storyId]: {
                    ...state[card.storyId],
                    [card.statusId]: state[card.storyId][card.statusId].map((task) => {
                        if (task.id === card.id) {
                            return {
                                ...task,
                                assigned: assigned
                            }
                        }

                        return task;
                    })
                }
            }
        }
        case 'CHANGE_CARD_STATUS': {
            const { mode, parentId, cardId, statusId } = action.payload;

            if (mode !== 'task') {
                return state;
            }

            const card = findCard(parentId, cardId, state);

            if (card.statusId === statusId) {
                return state;
            }

            const newState = Object.assign({}, state)
            const srcTasks = (get([card.storyId, card.statusId], newState) || []);
            const dstTasks = (get([card.storyId, statusId], newState) || []);

            return {
                ...state,
                [card.storyId]: {
                    ...state[card.storyId],
                    [card.statusId]: srcTasks.filter((task) => {
                        return task.id !== card.id
                    }),
                    [statusId]: dstTasks.concat([
                        Object.assign({}, card, {
                            statusId: statusId
                        })
                    ])
                }
            }
        }
        case 'ADD_COMMENT_TO_TASK': {
            const { card, body } = action.payload;
            const comment = {
                date: new Date().toDateString(),
                body: body,
                username: 'test user'
            }

            return {
                ...state,
                [card.storyId]: {
                    ...state[card.storyId],
                    [card.statusId]: state[card.storyId][card.statusId].map((story) => {
                        if (story.id === card.id) {
                            const comments = 'comments' in card ? card.comments.concat([comment]) : [comment]
                            return {
                                ...story,
                                comments: comments
                            }
                        }

                        return story;
                    })
                }
            }
        }
        default:
            return state;
    }
}