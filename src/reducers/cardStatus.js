const INITIAL_STATE = [
    {
        id: 1,
        status: 'New'
    },
    {
        id: 2,
        status: 'In Progress'
    },
    {
        id: 3,
        status: 'Resolved'
    },
    {
        id: 4,
        status: 'Feedback'
    },
    {
        id: 5,
        status: 'Finish'
    }
]

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
    default:
        return state;
    }
}