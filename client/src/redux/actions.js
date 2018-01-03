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

