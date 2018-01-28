import {fork} from 'redux-saga/effects'
import {getUserFlow, addUsersFlow, editUsersFlow, deleteUsersFlow} from './UserSaga'
import {adminLoginFlow, checkLoginFlow} from './LoginSaga'

export default function* rootSaga() {
  yield fork(getUserFlow);
  yield fork(addUsersFlow);
  yield fork(editUsersFlow);
  yield fork(deleteUsersFlow);
  yield fork(adminLoginFlow);
  yield fork(checkLoginFlow);
}