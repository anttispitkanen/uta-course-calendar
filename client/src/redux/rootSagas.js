import { all } from 'redux-saga/effects';

import {
    watchFetchCourse,
    watchToggleCourse,
    watchSendForDownload
} from './sagas';

export default function* appSaga() {
    yield all([
        watchFetchCourse(),
        watchToggleCourse(),
        watchSendForDownload()
    ]);
}
