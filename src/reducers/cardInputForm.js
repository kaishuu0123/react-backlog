const INITIAL_STATE = {
    open: false,
    dimmer: 'inverted',
    card: null,
    isEdit: false,
    isNew: true,
    mode: 'story',
    openConfirm: false,
    parentId: null
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'SHOW_CARD_INPUT_FORM': {
            const { card, mode, isNew, parentId } = action.payload;
            return Object.assign({}, state, {
                open: true,
                card: {
                    ...card
                },
                mode: mode,
                isNew: isNew,
                parentId: parentId,
                isEdit: isNew ? true : false
            });
        }
        case 'HIDE_CARD_INPUT_FORM': {
            const { card, mode, isNew, isEdit } = action.payload;
            return Object.assign({}, state, {
                open: false,
                card: {
                    ...card
                },
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
        case 'UPDATE_STORY': {
            const { story, title, description } = action.payload;

            return Object.assign({}, state, {
                card: {
                    ...story,
                    title: title,
                    description: description
                }
            })
        }
        case 'UPDATE_TASK': {
            const { task, title, description } = action.payload;

            return Object.assign({}, state, {
                card: {
                    ...task,
                    title: title,
                    description: description
                }
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