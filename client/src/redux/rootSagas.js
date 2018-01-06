import { all } from 'redux-saga/effects';

import {
    watchFetchCourse,
    watchToggleCourse
} from './sagas';

export default function* appSaga() {
    yield all([
        watchFetchCourse(),
        watchToggleCourse()
    ]);
}
