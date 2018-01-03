import { all } from 'redux-saga/effects';

import { watchFetchCourse } from './sagas';

export default function* appSaga() {
    yield all([
        watchFetchCourse()
    ]);
}
