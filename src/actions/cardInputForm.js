export function showCardInputForm(isNew, cardId, mode, parentId) {
    return {
        type: 'SHOW_CARD_INPUT_FORM',
        payload: {
            isNew: isNew,
            cardId: cardId,
            mode: mode,
            open: true,
            parentId: parentId
        }
    }
}

export function hideCardInputForm(cardId, mode) {
    return {
        type: 'HIDE_CARD_INPUT_FORM',
        payload: {
            cardId: cardId,
            mode: mode,
            open: false
        }
    }
}

export function switchEditModeCardInputForm(isEdit) {
    return {
        type: 'SWITCH_EDIT_MODE_CARD_INPUT_FORM',
        payload: {
            isEdit: isEdit
        }
    }
}

export function switchConfirmDialog(isShow) {
    return {
        type: 'SWITCH_CONFIRM_DIALOG',
        payload: {
            isShow: isShow
        }
    }
}

export function changeCardAssigned(mode, parentId, cardId, assigned) {
    return {
        type: 'CHANGE_CARD_ASSIGNED',
        payload: {
            mode: mode,
            parentId: parentId,
            cardId: cardId,
            assigned: assigned
        }
    }
}

export function changeCardStatus(mode, parentId, cardId, statusId) {
    return {
        type: 'CHANGE_CARD_STATUS',
        payload: {
            mode: mode,
            parentId: parentId,
            cardId: cardId,
            statusId: statusId
        }
    }
}

export function changeCardPoint(mode, parentId, cardId, pointId) {
    return {
        type: 'CHANGE_CARD_POINT',
        payload: {
            mode: mode,
            parentId: parentId,
            cardId: cardId,
            pointId: pointId
        }
    }
}