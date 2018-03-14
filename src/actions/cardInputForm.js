export function showCardInputForm(isNew, card, mode, parentId) {
    return {
        type: 'SHOW_CARD_INPUT_FORM',
        payload: {
            isNew: isNew,
            card: card,
            mode: mode,
            open: true,
            parentId: parentId
        }
    }
}

export function hideCardInputForm(card, mode) {
    return {
        type: 'HIDE_CARD_INPUT_FORM',
        payload: {
            card: card,
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

export function changeCardAssigned(mode, card, assigned) {
    return {
        type: 'CHANGE_CARD_ASSIGNED',
        payload: {
            mode: mode,
            card: card,
            assigned: assigned
        }
    }
}

export function changeCardStatus(mode, card, statusId) {
    return {
        type: 'CHANGE_CARD_STATUS',
        payload: {
            mode: mode,
            card: card,
            statusId: statusId
        }
    }
}

export function changeCardPoint(mode, card, pointId) {
    return {
        type: 'CHANGE_CARD_POINT',
        payload: {
            mode: mode,
            card: card,
            pointId: pointId
        }
    }
}