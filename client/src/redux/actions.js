/**
 * Pure action creators
 */

/**
 * Search actions
 */
const search = id => ({
    type: 'SEARCH',
    id
});

const searchError = () => ({
    type: 'SEARCH_ERROR'
});

export const searchActions = {
    search,
    searchError
};

/**
 * Course actions
 */
const courseFetch = () => ({
    type: 'COURSE_FETCH'
});

const courseFetchError = () => ({
    type: 'COURSE_FETCH_ERROR'
});

const courseFetchSuccess = course => ({
    type: 'COURSE_FETCH_SUCCESS',
    course
});

export const courseActions = {
    courseFetch,
    courseFetchError,
    courseFetchSuccess
};
