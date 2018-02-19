export function addCardInputForm(storyId) {
    return {
        type: 'ADD_CARD_INPUT_FORM',
        payload: {
            storyId: storyId,
            open: true
        }
    }
}

export function showCardInputForm(storyId) {
    return {
        type: 'SHOW_CARD_INPUT_FORM',
        payload: {
            storyId: storyId,
            open: true
        }
    }
}

export function hideCardInputForm(storyId) {
    return {
        type: 'HIDE_CARD_INPUT_FORM',
        payload: {
            storyId: storyId,
            open: false
        }
    }
}
