export function addStory (sprintId, title, description) {
    return {
        type: 'ADD_STORY',
        payload: {
            sprintId: sprintId,
            title: title,
            description: description
        }
    }
}