const INITIAL_STATE = [
]

export default function (state = INITIAL_STATE, action) {
    let newState;
    let entry;

    switch(action.type) {
        case 'ADD_CARD_INPUT_FORM':
            return state.concat([
                {
                    storyId: action.payload.storyId,
                    open: false,
                }
            ])
        case 'SHOW_CARD_INPUT_FORM':
            newState = [...state];
            entry = newState.find(function(entry, index) {
                return (entry.storyId === action.payload.storyId);
            });
            entry.open = true;
            return newState
        case 'HIDE_CARD_INPUT_FORM':
            newState = [...state];
            entry = newState.find(function(entry, index) {
                return (entry.storyId === action.payload.storyId);
            });
            entry.open = false;
            return newState
        default:
            return state;
    }
}