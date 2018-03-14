
import { difference } from 'lodash';

const INITIAL_STATE = {
    1: [
        {
            id: 1,
            title: 'longlonglonglonglonglonglonglong story Title',
            description: 'text of story1',
            sprintId: 1,
            kind: 'feature'
        },
        {
            id: 6,
            title: 'Story Title6',
            description: 'text of story1',
            sprintId: 1,
            kind: 'bug'
        },
        {
            id: 7,
            title: 'Story Title7',
            description: 'text of story1',
            sprintId: 1,
            kind: 'imprv'
        }
    ],
    2: [
        {
            id: 2,
            title: 'ストーリータイトル',
            description: 'text of story2',
            sprintId: 2,
        },
        {
            id: 3,
            title: 'ストーリータイトル3',
            description: 'text of story2',
            sprintId: 2,
        },
    ],
    3: [
        {
            id: 4,
            title: 'ストーリータイトル4',
            description: 'text of story2',
            sprintId: 3,
        },
        {
            id: 5,
            title: 'ストーリータイトル5',
            description: 'text of story2',
            sprintId: 3,
        },
    ]
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'ADD_SPRINT': {
            const newState = Object.assign({}, state);

            let maxId = 0;
            Object.keys(newState).forEach((sprintId) => {
                maxId = Math.max(sprintId, maxId);
            });

            return {
                ...state,
                [maxId + 1]: []
            }
        }
        case 'ADD_STORY': {
            const { sprintId, title, description } = action.payload;
            const newState = Object.assign({}, state);

            let maxId = 0;
            Object.keys(newState).forEach((key) => {
                newState[key].forEach((story) => {
                    maxId = Math.max(story.id, maxId);
                });
            });

            return {
                ...state,
                [sprintId]: newState[sprintId].concat({
                    id: maxId + 1,
                    title: title,
                    description: description,
                    sprintId: sprintId,
                    point: null
                })
            }
        }
        case 'UPDATE_STORY': {
            const { sprintId, story, title, description } = action.payload;
            const newState = Object.assign({}, state);

            return {
                ...state,
                [sprintId]: newState[sprintId].map((item) => {
                    if (story.id === item.id) {
                        return {
                            ...item,
                            title: title,
                            description: description
                        }
                    }
                    return { ...item }
                })
            }
        }
        case 'DELETE_STORY': {
            const { story } = action.payload;
            const newState = Object.assign({}, state);

            newState[story.sprintId] = newState[story.sprintId].filter((item) => {
                return story.id !== item.id;
            });

            return {
                ...newState,
            }
        }
        case 'CHANGE_STORY_SORT_ORDER': {
            const { srcStoryId, dstStoryId, dragIndex, hoverIndex} = action.payload;
            const newState = Object.assign({}, state);

            const srcSprintId = Object.keys(newState).find((key) => {
                return newState[key].find((story) => {
                    return srcStoryId === story.id
                });
            })
            const dstSprintId = Object.keys(newState).find((key) => {
                return newState[key].find((story) => {
                    return dstStoryId === story.id
                });
            })

            if (srcSprintId !== dstSprintId) {
                const srcStories = newState[srcSprintId];
                const dstStories = newState[dstSprintId];
                const [removed] = srcStories.splice(dragIndex, 1);
                removed.sprintId = dstSprintId;
                dstStories.splice(hoverIndex, 0, removed);

                return {
                    ...state,
                    [srcSprintId]: [
                        ...srcStories
                    ],
                    [dstSprintId]: [
                        ...dstStories
                    ]
                };
            } else {
                const [removed] = newState[srcSprintId].splice(dragIndex, 1);
                newState[srcSprintId].splice(hoverIndex, 0, removed);

                return {
                    ...state,
                    [srcSprintId]: [
                        ...newState[srcSprintId]
                    ]
                }
            }
        }
        case 'ATTACH_STORY_TO_SPRINT': {
            const { targetSprintId, sourceStoryId, sourceStoryIndex } = action.payload;
            const newState = Object.assign({}, state);

            const srcSprintId = Object.keys(newState).find((key) => {
                return newState[key].find((story) => {
                    return sourceStoryId === story.id
                });
            });

            const srcStories = newState[srcSprintId];
            const dstStories = newState[targetSprintId];
            const [removed] = srcStories.splice(sourceStoryIndex, 1);
            removed.sprintId = targetSprintId;
            dstStories.splice(0, 0, removed);

            return {
                ...state,
                [srcSprintId]: [
                    ...srcStories
                ],
                [targetSprintId]: [
                    ...dstStories
                ]
            };
        }
        case 'CHANGE_CARD_ASSIGNED': {
            const { mode, card, assigned } = action.payload;

            if (mode !== 'story') {
                return state;
            }

            return {
                ...state,
                [card.sprintId]: state[card.sprintId].map((story) => {
                    if (story.id === card.id) {
                        return {
                            ...story,
                            assigned: assigned
                        }
                    }

                    return story;
                })
            }
        }
        case 'CHANGE_CARD_STATUS': {
            const { mode, card, statusId } = action.payload;

            if (mode !== 'story') {
                return state;
            }

            return {
                ...state,
                [card.sprintId]: state[card.sprintId].map((story) => {
                    if (story.id === card.id) {
                        return {
                            ...story,
                            statusId: statusId
                        }
                    }

                    return story;
                })
            }
        }
        case 'CHANGE_CARD_POINT': {
            const { mode, card, pointId } = action.payload;

            if (mode !== 'story') {
                return state;
            }

            return {
                ...state,
                [card.sprintId]: state[card.sprintId].map((story) => {
                    if (story.id === card.id) {
                        return {
                            ...story,
                            pointId: pointId
                        }
                    }

                    return story;
                })
            }
        }
        default:
            return state;
    }
}