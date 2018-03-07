export function addSprint() {
    return {
        type: 'ADD_SPRINT',
        payload: {

        }
    }
}

export function updateSprint(sprintId, title, startDate, endDate) {
    return {
        type: 'UPDATE_SPRINT',
        payload: {
            sprintId: sprintId,
            title: title,
            startDate: startDate,
            endDate: endDate
        }
    }
}