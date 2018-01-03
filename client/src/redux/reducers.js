/**
 * Reducers defined here
 */

/**
 * Search reducer
 */
const initialSearchState = {
    id: null,
    error: false
};

export const searchReducer = (state = initialSearchState, action) => {
    switch (action.type) {
        case 'SEARCH':
            return {
                ...state,
                error: false,
                id: action.id
            };

        case 'SEARCH_ERROR':
            return {
                ...state,
                error: true
            };

        default:
            return state;
    }
}

/**
 * Course reducer
 */
const courseStatus = {
    SUCCESS: 'SUCCESS',
    FETCHING: 'FETCHING',
    ERROR: 'ERROR'
};

const initialCourseState = {
    course: null,
    status: courseStatus.SUCCESS
};

export const courseReducer = (state = initialCourseState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
