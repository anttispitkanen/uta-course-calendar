import { combineReducers } from 'redux';

const testReducer = (state = { kissa: 'Maisa' }, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default combineReducers({
    testReducer
});
