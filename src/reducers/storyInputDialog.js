const INITIAL_STATE = {
    open: false,
    dimmer: 'inverted',
    sprintId: null,
    story: null
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'SHOW_STORY_INPUT_DIALOG':
            return Object.assign({}, state, {
                open: true,
                sprintId: action.payload.sprintId,
                story: action.payload.story
            });
        case 'HIDE_STORY_INPUT_DIALOG':
            return Object.assign({}, state, {
                open: false,
                sprintId: action.payload.sprintId,
                story: null,
            });
        default:
            return state;
    }
}