export function showStoryInputDialog(sprintId, story) {
    return {
        type: 'SHOW_STORY_INPUT_DIALOG',
        payload: {
            sprintId: sprintId,
            open: true,
            story: story
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
