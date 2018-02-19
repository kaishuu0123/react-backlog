const INITIAL_STATE = [
    {
        id: 1,
        sprintTitle: 'Sprint-11',
    },
    {
        id: 2,
        sprintTitle: 'Sprint-12',
    }
];

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        default:
            return state;
    }
}