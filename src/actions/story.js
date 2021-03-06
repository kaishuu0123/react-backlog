export function addStory (sprintId, title, description, assigned, statusId, pointId) {
    return {
        type: 'ADD_STORY',
        payload: {
            sprintId: sprintId,
            title: title,
            description: description,
            assigned: assigned,
            statusId: statusId,
            pointId: pointId
        }
    }
}

export function updateStory (sprintId, story, title, description) {
    return {
        type: 'UPDATE_STORY',
        payload: {
            sprintId: sprintId,
            story: story,
            title: title,
            description: description
        }
    }
}

export function deleteStory (story) {
    return {
        type: 'DELETE_STORY',
        payload: {
            story: story,
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

export function addCommentToStory(card, body) {
    return {
        type: 'ADD_COMMENT_TO_STORY',
        payload: {
            card: card,
            body: body
        }
    }
}