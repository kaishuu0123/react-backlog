export function showCardInputForm(storyId, task) {
    return {
        type: 'SHOW_CARD_INPUT_FORM',
        payload: {
            storyId: storyId,
            task: task,
            open: true
        }
    }
}

export function hideCardInputForm(storyId, task) {
    return {
        type: 'HIDE_CARD_INPUT_FORM',
        payload: {
            storyId: storyId,
            task: task,
            open: false
        }
    }
}
