const INITIAL_STATE = {
    open: false,
    dimmer: 'inverted',
    cardId: null,
    isEdit: false,
    isNew: true,
    mode: 'story',
    openConfirm: false,
    parentId: null
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'SHOW_CARD_INPUT_FORM': {
            const { cardId, mode, isNew, parentId } = action.payload;
            return Object.assign({}, state, {
                open: true,
                cardId: cardId,
                mode: mode,
                isNew: isNew,
                parentId: parentId,
                isEdit: isNew ? true : false
            });
        }
        case 'HIDE_CARD_INPUT_FORM': {
            const { cardId, mode, isNew, isEdit } = action.payload;
            return Object.assign({}, state, {
                open: false,
                cardId: cardId,
                mode: mode,
                isEdit: false
            });
        }
        case 'SWITCH_EDIT_MODE_CARD_INPUT_FORM': {
            const { isEdit } = action.payload;
            return Object.assign({}, state, {
                isEdit: isEdit
            })
        }
        case 'SWITCH_CONFIRM_DIALOG': {
            const { isShow } = action.payload;
            return Object.assign({}, state, {
                openConfirm: isShow
            });
        }
        default:
            return state;
    }
}