import { combineReducers } from 'redux';

import {
    searchReducer,
    courseReducer,
    chosenGroupsReducer
} from './reducers';

export default combineReducers({
    searchReducer,
    courseReducer,
    chosenGroupsReducer
});
