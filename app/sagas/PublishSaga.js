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

export function* publishArticle(data) {
  yield put({type: IndexTypes.FETCH_START})
  try {
    return yield post('/article/publishArticle', data)
  } catch (err) {
    console.error(err);
  } finally {
    yield put({type: IndexTypes.FETCH_END})
  }
}

export function* publishArticleFlow() {
  while(true) {
    let req = yield take(actionTypes.PUBLISH_ARTICLE);
    let res = yield call(publishArticle, req.articleData);
    if (res) {
      res = JSON.parse(res);
      if(res.status) {
        yield put({type: actionTypes.PUBLISH_RESULT, content: '文章上传成功！', title: '上传文章成功' ,alertType:'success'});
      } else {
        yield put({type: actionTypes.PUBLISH_RESULT, content: '文章上传失败！', title: '上传文章失败，请检查访问链接不能与已有文章重复！' ,alertType:'error'});
      }
    } else {
      yield put({type: actionTypes.PUBLISH_RESULT, content: '文章上传失败！', title: '上传文章失败，请检查访问链接不能与已有文章重复！' ,alertType:'error'});
    }
  }
}

export function* editArticle(data) {
  try {
    return yield post('/article/editArticle', data)
  } catch(err) {
    console.error(err);
  }
}

export function* editArticleFlow() {
  while(true) {
    let req = yield take(actionTypes.EDIT_ARTICLE);
    let res = yield call(editArticle, req.data);
    if(res) {
      res = JSON.parse(res);
      if(res.status) {
        yield put({type: actionTypes.EDIT_ARTICLE_RESULT, content: '文章修改成功！', title: '文章修改成功' ,alertType:'success'})
      } else {
        yield put({type: actionTypes.EDIT_ARTICLE_RESULT, content: '文章修改失败！', title: '上传文章失败，请检查访问链接不能与已有文章重复！' ,alertType:'error'})
      }
    } else {
      yield put({type: actionTypes.EDIT_ARTICLE_RESULT, content: '文章上传失败！', title: '上传文章失败，请检查访问链接不能与已有文章重复！' ,alertType:'error'});
    }
  }
}

export function* editFileInfo(data) {
  try {
    return yield post('/article/editInfo', data);
  } catch(err) {
    console.error(err);
  }
}

export function* editFileInfoFlow() {
  while(true) {
    let req = yield take(actionTypes.EDIT_UPLOAD_INFO);
    let res = yield call(editFileInfo, req.data);
    if(res) {
      res = JSON.parse(res);
      if(res.status) {
        yield put({type: actionTypes.EDIT_ARTICLE_RESULT, content: '文章修改成功！', title: '文章修改成功' ,alertType:'success'})
      } else {
        yield put({type: actionTypes.EDIT_ARTICLE_RESULT, content: '文章修改失败！', title: '上传文章失败，请检查访问链接不能与已有文章重复！' ,alertType:'error'})
      }
    } else {
      yield put({type: actionTypes.EDIT_ARTICLE_RESULT, content: '文章上传失败！', title: '上传文章失败，请检查访问链接不能与已有文章重复！' ,alertType:'error'});
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

export function* deleteArticle(_ids) {
  try {
    return yield post('/article/deleteArticle', _ids)
  } catch (err){
    console.error(err);
  }
}

export function* deleteArticleFlow() {
  while(true) {
    let req = yield take(actionTypes.DELETE_ARTICLE);
    let res = yield call(deleteArticle, {_ids: req.articleId});
    if(res) {
      res = JSON.parse(res);
      if(res.status){
        yield put({type: actionTypes.DELETE_ARTICLE_RESULT, content: '文章已被删除！', title: '文章已被删除' ,alertType:'success'});
      } else {
        yield put({type: actionTypes.DELETE_ARTICLE_RESULT, content: '文章删除失败！', title: '文章删除失败', alertType: 'error'});
      }
    } else {
      yield put({type: actionTypes.DELETE_ARTICLE_RESULT, content: '文章删除失败！', title: '文章删除失败', alertType: 'error'});
    }
  }
}

export function* getArticleContent(_id) {
  yield put({type: IndexTypes.FETCH_START})
  try {
    return yield post('/article/getArticleContent', _id);
  }catch(err) {
    console.error(err);
  }finally {
    yield put({type: IndexTypes.FETCH_END})
  }
}

export function* getArticleContentFlow() {
  while(true) {
    let req = yield take(actionTypes.GET_ARTICLE_CONTENT);
    let res = yield call(getArticleContent, {_id: req._id});
    if(res) {
      res = JSON.parse(res);
      if(res.status) {
        console.log(res.content)
        yield put({type: actionTypes.SET_ARTICLE_CONTENT, content: res.content, fileType: res.fileType})
      } else {
        yield put({type: actionTypes.SET_ARTICLE_CONTENT, content: '请检查网络'})
      }
    }
  }
}

export function* reviewComment(data) {
  try {
    return yield post('/article/reviewComment', data);
  } catch(err) {
    console.error(err);
  }
}


export function* reviewCommentFlow() {
  while(true) {
    let req = yield take(actionTypes.COMMENT_REVIEW);
    let res = yield call(reviewComment, {commentId: req.commentId, articleId: req.articleId, passed: req.passed})
    if(res) {
      res = JSON.parse(res);
      if(res.status) {
        yield put({type: actionTypes.COMMENT_REVIEW_SUCCESS, comment: res.comment, articleId: res.articleId})
      } else {
        yield put({type: actionTypes.COMMENT_REVIEW_FAILED, content: '评论操作失败，请检查网络！', title: '', alertType: 'error'});
      }
    } else {
      yield put({type: actionTypes.COMMENT_REVIEW_FAILED, content: '评论操作失败，请检查网络！', title: '', alertType: 'error'});
    }
  }
}