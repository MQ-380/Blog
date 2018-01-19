import {fork} from 'redux-saga/effects'
import {getUsers} from './userSaga'

export default function* rootSaga() {
  yield fork(getUsers)
}