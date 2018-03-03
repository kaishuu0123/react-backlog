const INITIAL_STATE = {
    open: false,
    dimmer: 'inverted',
    storyId: null,
    task: null
}

export default function (state = INITIAL_STATE, action) {
    let newState;
    let entry;

    switch(action.type) {
        case 'SHOW_CARD_INPUT_FORM':
            return Object.assign({}, state, {
                open: true,
                storyId: action.payload.storyId,
                task: action.payload.task
            });
        case 'HIDE_CARD_INPUT_FORM':
            return Object.assign({}, state, {
                open: false,
                storyId: action.payload.storyId,
                task: action.payload.task
            });
        default:
            return state;
    }
}