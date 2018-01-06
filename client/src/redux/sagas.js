/**
 * Sagas
 */
import { takeEvery, put, call, select } from 'redux-saga/effects';
import { courseActions, groupActions } from './actions';

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
        if (course.error) throw Error();
        injectSelected(course);
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

// this function injects the selected-attribute that's used in UI state
const injectSelected = course => {
    course._opsi_opryhmat.map(o => o.selected = false);
    return course;
}

/**
 * Group sagas
 */

// watcher saga
export function* watchToggleCourse() {
    yield takeEvery('TOGGLE_GROUP_SELECTED', toggleCourse);
}

// worker saga
function* toggleCourse(action) {
    try {
        yield put(groupActions.toggleGroupChosenForDownload(action.id, action.group));
    } catch (e) {
        console.error(e);
    }
}

/**
 * Download sagas
 */

// watcher saga
export function* watchSendForDownload() {
    yield takeEvery('SEND_FOR_DOWNLOAD', sendForDownload);
}

// worker saga
function* sendForDownload() {
    try {
        const groups = yield select(state => state.chosenGroupsReducer);
        const response = yield call(downloadSender, groups);
        console.log(response);
    } catch (e) {
        console.error(e);
    }
}

const downloadSender = groups => (
    fetch('/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            groups
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw Error();
        }
    })
    .catch(err => { throw Error() })
);
