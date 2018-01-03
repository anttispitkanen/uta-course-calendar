/**
 * Sagas
 */
import { takeEvery, put, call, select } from 'redux-saga/effects';
import { courseActions } from './actions';

/**
 * Course sagas
 */

// watcher saga
export function* watchFetchCourse() {
    yield takeEvery('COURSE_FETCH', fetchCourse);
}

// worker saga
function* fetchCourse() {
    try {
        const id = yield select(state => state.searchReducer.id);
        const course = yield call(courseFetcher, id);
        yield put(courseActions.courseFetchSuccess(course));
    } catch (e) {
        yield put(courseActions.courseFetchError());
    }
}

const courseFetcher = id => (
    fetch(`/course?id=${id}`)
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw Error();
        }
    })
    .catch(err => {
        console.error(err);
        throw Error();
    })
);
