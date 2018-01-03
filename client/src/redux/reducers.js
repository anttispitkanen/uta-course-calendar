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
        case 'COURSE_FETCH':
            return {
                ...state,
                status: courseStatus.FETCHING
            };

        case 'COURSE_FETCH_ERROR':
            return {
                ...state,
                status: courseStatus.ERROR
            };

        case 'COURSE_FETCH_SUCCESS':
            return {
                ...state,
                status: courseStatus.SUCCESS,
                course: action.course
            };

        default:
            return state;
    }
}
