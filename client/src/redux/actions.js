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

const toggleGroupSelected = (id, group) => ({
    type: 'TOGGLE_GROUP_SELECTED',
    id,
    group
});

export const courseActions = {
    courseFetch,
    courseFetchError,
    courseFetchSuccess,
    toggleGroupSelected
};

/**
 * Group actions
 */

const toggleGroupChosenForDownload = (id, group) => ({
    type: 'TOGGLE_GROUP_CHOSEN_FOR_DOWNLOAD',
    id,
    group
});

export const groupActions = {
    toggleGroupChosenForDownload
};
