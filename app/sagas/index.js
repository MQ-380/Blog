import {fork} from 'redux-saga/effects'
import {getUserFlow, addUsersFlow, editUsersFlow, deleteUsersFlow, editPasswordFlow} from './UserSaga'
import {adminLoginFlow, checkLoginFlow, LogoutFlow } from './LoginSaga'

export default function* rootSaga() {
  yield fork(getUserFlow);
  yield fork(addUsersFlow);
  yield fork(editUsersFlow);
  yield fork(deleteUsersFlow);
  yield fork(adminLoginFlow);
  yield fork(checkLoginFlow);
  yield fork(LogoutFlow);
  yield fork(editPasswordFlow);
}