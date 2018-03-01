export function addStory (sprintId, title, description) {
    return {
        type: 'ADD_STORY',
        payload: {
            sprintId: sprintId,
            title: title,
            description: description
        }
    }
}

export function updateStory (sprintId, storyId, title, description) {
    return {
        type: 'UPDATE_STORY',
        payload: {
            sprintId: sprintId,
            storyId: storyId,
            title: title,
            description: description
        }
    }
}

export function changeStorySortOrder (srcStoryId, dstStoryId, dragIndex, hoverIndex) {
    return {
        type: 'CHANGE_STORY_SORT_ORDER',
        payload: {
            srcStoryId: srcStoryId,
            dstStoryId: dstStoryId,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex,
        }
    }
}

export function attachToList(targetSprintId, sourceStoryId, sourceStoryIndex) {
    return {
        type: 'ATTACH_STORY_TO_SPRINT',
        payload: {
            targetSprintId: targetSprintId,
            sourceStoryId: sourceStoryId,
            sourceStoryIndex: sourceStoryIndex,
        }
    }
}