const INITIAL_STATE = [
    {
        id: 1,
        point: 1.0
    },
    {
        id: 2,
        point: 3.0
    },
    {
        id: 3,
        point: 5.0
    }
]

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
    default:
        return state;
    }
}