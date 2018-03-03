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
    let req = yield take(actionTypes.UPLOAD_INFO);
    const data = {fileName: req.fileName, linkName: req.linkName, tags: req.tags, articleName: req.articleName, writer: req.writer};
    let res = yield call(uploadArticle, data);
    if(res) {
      res = JSON.parse(res);
      if(res.status) {
        yield put({type: actionTypes.PUBLISH_RESULT, content: '文章上传成功！', title: '上传文章成功' ,alertType:'success'});
      } else {
        yield put({type: actionTypes.PUBLISH_RESULT, content: '文章上传失败！', title: '上传文章失败，请检查访问链接不能与已有文章重复！' ,alertType:'error'});
      }
    }
  }
}

export function* cancelUpload(data) {
  try {
    return yield post('/article/deleteFile', data);
  } catch(err) {
    console.error(err);
  }
}

export function* cancelUploadFlow() {
  while(true) {
    let req = yield take(actionTypes.CANCEL_UPLOAD);
    const data = {fileName: req.fileName};
    yield call(cancelUpload, data);
  }
}

export function* getArticleList() {
  try {
    return yield get('/article/getArticleList');
  } catch (err) {
    console.error(err);
  }
}

export function* getArticleListFlow() {
  while(true) {
    let req = yield take(actionTypes.GET_ARTICLE_LIST);
    let res = yield call(getArticleList);
    if(res) {
      res = JSON.parse(res);
      yield put({type: actionTypes.ARTICLE_LIST_RESULT, list: res})
    }
  }
}