import { all } from 'redux-saga/effects';

function* testSaga() {
    yield console.log('jee saaga toimii :DD')
}

export default function* appSaga() {
    yield all([
        testSaga()
    ]);
}
