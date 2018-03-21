import {fork} from 'redux-saga/effects'
import {getUserFlow, addUsersFlow, editUsersFlow, deleteUsersFlow, editPasswordFlow} from './UserSaga'
import {adminLoginFlow, checkLoginFlow, LogoutFlow } from './LoginSaga'
import {uploadArticleInfoFlow, cancelUploadFlow, getArticleListFlow, deleteArticleFlow,getArticleContentFlow,
  reviewCommentFlow, publishArticleFlow} from './PublishSaga'

export default function* rootSaga() {
  yield fork(getUserFlow);
  yield fork(addUsersFlow);
  yield fork(editUsersFlow);
  yield fork(deleteUsersFlow);
  yield fork(adminLoginFlow);
  yield fork(checkLoginFlow);
  yield fork(LogoutFlow);
  yield fork(editPasswordFlow);
  yield fork(uploadArticleInfoFlow);
  yield fork(cancelUploadFlow);
  yield fork(getArticleListFlow);
  yield fork(deleteArticleFlow);
  yield fork(getArticleContentFlow);
  yield fork(reviewCommentFlow);
  yield fork(publishArticleFlow);
}