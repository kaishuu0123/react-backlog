const INITIAL_STATE = [
    {
        id: 1,
        title: 'longlonglonglonglonglonglonglong story Title',
        body: 'text of story1',
        sprintId: null,
        point: 1.0
    },
    {
        id: 2,
        title: 'ストーリータイトル',
        body: 'text of story2',
        sprintId: 1,
        point: 3.0
    },
    {
        id: 3,
        title: 'ストーリータイトル3',
        body: 'text of story2',
        sprint: 1,
        point: 5.0
    },
    {
        id: 4,
        title: 'ストーリータイトル4',
        body: 'text of story2',
        sprintId: 2,
        point: 3.0
    },
    {
        id: 5,
        title: 'ストーリータイトル5',
        body: 'text of story2',
        sprintId: 2,
        point: 1.0
    },
    {
        id: 6,
        title: 'Story Title6',
        body: 'text of story1',
        sprintId: null,
        point: 1.0
    },
    {
        id: 7,
        title: 'Story Title7',
        body: 'text of story1',
        sprintId: null,
        point: 1.0
    },
];

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'ADD_STORY':
            let maxId = 0;
            state.forEach((story) => {
                maxId = Math.max(story.id, maxId);
            });
            return state.concat({
                id: maxId + 1,
                title: action.payload.title,
                body: action.payload.description,
                sprintId: action.payload.sprintId,
                point: null
            })
        default:
            return state;
    }
}