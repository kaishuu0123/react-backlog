
import { difference } from 'lodash';

const INITIAL_STATE = {
    1: [
        {
            id: 1,
            title: 'longlonglonglonglonglonglonglong story Title',
            description: 'text of story1',
            sprintId: 1,
            point: 1.0,
            kind: 'feature'
        },
        {
            id: 6,
            title: 'Story Title6',
            description: 'text of story1',
            sprintId: 1,
            point: 1.0,
            kind: 'bug'
        },
        {
            id: 7,
            title: 'Story Title7',
            description: 'text of story1',
            sprintId: 1,
            point: 1.0,
            kind: 'imprv'
        }
    ],
    2: [
        {
            id: 2,
            title: 'ストーリータイトル',
            description: 'text of story2',
            sprintId: 2,
            point: 3.0
        },
        {
            id: 3,
            title: 'ストーリータイトル3',
            description: 'text of story2',
            sprint: 2,
            point: 5.0
        },
    ],
    3: [
        {
            id: 4,
            title: 'ストーリータイトル4',
            description: 'text of story2',
            sprintId: 3,
            point: 3.0
        },
        {
            id: 5,
            title: 'ストーリータイトル5',
            description: 'text of story2',
            sprintId: 3,
            point: 1.0
        },
    ]
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
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
        default:
            return state;
    }
}