import {put, take, call} from 'redux-saga/effects'
import {get, post} from './fetch'
import {actionTypes as IndexTypes} from '../reducers/index'
import {actionTypes as actionTypes} from '../reducers/PublishAction'


export function* uploadArticle (data) {
  yield put({type: IndexTypes.FETCH_START})
  try {
    return yield post('/article/uploadInfo', data);
  }catch(err) {
    console.error(err);
  }finally {
    yield put({type: IndexTypes.FETCH_END})
  }
}


export function* uploadArticleInfoFlow() {
  while(true) {
    let req = take(actionTypes.UPLOAD_INFO);
    const data = {fileName: req.fileName, linkName: req.linkName, tags: req.tags};
    let res = call(uploadArticle, data);
    if(res) {
      res = JSON.parse(res);
      if(res.status) {
        yield put({type: actionTypes.PUBLISH_SUCCESS, username:data.username, isAdmin: res.isAdmin, id:res.id, email: res.email});
      }
    }
  }
}