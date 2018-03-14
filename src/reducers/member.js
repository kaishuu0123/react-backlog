const INITIAL_STATE = [
    {
        id: 1,
        name: 'Koki Oyatsu'
    },
    {
        id: 2,
        name: 'Foo Bar'
    }
]

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
    default:
        return state;
    }
}