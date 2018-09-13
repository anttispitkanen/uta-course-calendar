/**
 * Sagas
 */
import fileDownload from 'js-file-download';
import { takeEvery, put, call, select } from 'redux-saga/effects';
import { courseActions, groupActions } from './actions';
import { calendarBuilder } from '../utils/calendarBuilder';

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
    yield put(groupActions.clearChosenGroups());
  } catch (e) {
    yield put(courseActions.courseFetchError());
  }
}

const courseFetcher = id =>
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
    });

// this function injects the selected-attribute that's used in UI state
const injectSelected = course => {
  course._opsi_opryhmat.map(o => (o.selected = false));
  return course;
};

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
    yield put(
      groupActions.toggleGroupChosenForDownload(action.id, action.group),
    );
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
    const code = yield select(state => state.courseReducer.course.code);
    const calendar = yield call(calendarBuilder, groups);
    const fileName = `Calendar-${code}-${Math.floor(
      Math.random() * 100000,
    )}.ics`;
    return fileDownload(calendar.toString(), fileName);
  } catch (e) {
    console.error(e);
  }
}
