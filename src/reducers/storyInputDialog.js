const INITIAL_STATE = {
    open: false,
    dimmer: 'inverted',
    sprintId: null
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'SHOW_STORY_INPUT_DIALOG':
            return Object.assign({}, state, {
                open: true,
                sprintId: action.payload.sprintId,
            });
        case 'HIDE_STORY_INPUT_DIALOG':
            return Object.assign({}, state, {
                open: false,
                sprintId: action.payload.sprintId,
            });
        default:
            return state;
    }
}