import {fork} from 'redux-saga/effects'
import {getUserFlow, addUsersFlow, editUsersFlow, deleteUsersFlow} from './userSaga'

export default function* rootSaga() {
  yield fork(getUserFlow);
  yield fork(addUsersFlow);
  yield fork(editUsersFlow);
  yield fork(deleteUsersFlow);
}