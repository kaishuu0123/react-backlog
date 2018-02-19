export function showStoryInputDialog(sprintId) {
    if (sprintId == undefined) {
        sprintId = null;
    }
    return {
        type: 'SHOW_STORY_INPUT_DIALOG',
        payload: {
            sprintId: sprintId,
            open: true
        }
    }
}

export function hideStoryInputDialog() {
    return {
        type: 'HIDE_STORY_INPUT_DIALOG',
        payload: {
            open: false
        }
    }
}
