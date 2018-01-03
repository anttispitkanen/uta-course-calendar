import { combineReducers } from 'redux';

import {
    searchReducer,
    courseReducer
} from './reducers';

export default combineReducers({
    searchReducer,
    courseReducer
});
