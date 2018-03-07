const INITIAL_STATE = [
    {
        id: 1,
        title: 'Backlog',
        isEdit: false,
    },
    {
        id: 2,
        title: 'Sprint-11',
        startDate: null,
        endDate: null,
    },
    {
        id: 3,
        title: 'Sprint-12',
        startDate: null,
        endDate: null,
    }
];

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'ADD_SPRINT':
            const newState = [].concat(state);

            let maxId = 0;
            newState.forEach((item) => {
                maxId = Math.max(item.id, maxId);
            });

            return [
                ...newState.concat({
                    id: maxId + 1,
                    title: 'Sprint'
                })
            ]
        case 'UPDATE_SPRINT':
            const {
                sprintId,
                title,
                startDate,
                endDate
            } = action.payload;

            return state.map((item) => {
                if (item.id === sprintId) {
                    return {
                        ...item,
                        title: title,
                        startDate: startDate,
                        endDate: endDate
                    }
                }

                return {
                    ...item
                }
            });
        default:
            return state;
    }
}