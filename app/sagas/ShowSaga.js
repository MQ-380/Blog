import { put, take, call } from 'redux-saga/effects'
import { get, post } from './fetch'
import { actionTypes as showActionType } from '../reducers/ShowAction'
import { actionTypes } from '../reducers/PublishAction'

export function* checkUserExists(username) {
  try {
    return yield post('/show/checkUser', username)
  } catch (err) {
    console.error(err);
  }
}

export function* checkUserExistsFlow() {
  while (true) {
    let req = yield take(showActionType.CHECK_USER)
    let res = yield call(checkUserExists, {username: req.username})
    if (res) {
      res = JSON.parse(res);
      yield put({
        type: showActionType.CHECK_USER_RESULT,
        result: res.status,
        userPublicInfo: res.userData
      });
    } else {
      yield put({
        type: showActionType.CHECK_USER_RESULT,
        result: false,
        userPublicInfo: {}
      });
    }
  }
}

export function* getArticleInfo (linkName) {
  try {
    return yield post('/show/getArticleInfo', {linkName})
  } catch (err) {
    console.error(err)
  }
}

export function* getArticleInfoFlow () {
  while (true) {
    let req = yield take(showActionType.GET_ARTICLE_INFO)
    let res = yield call(getArticleInfo, req.linkName)
    if (res) {
      res = JSON.parse(res)
      if (res.status) {
        yield put({
          type: showActionType.ARTICLE_AND_COMMENT,
          result: true,
          fullInfo: res.fullInfo
        });
      }
    } else {
      yield put({
        type: showActionType.ARTICLE_AND_COMMENT,
        result: false,
        fullInfo: {}
      })
    }
  }
}

export function* publishComment (data) {
  try {
    return yield post('/show/publishComment', data)
  } catch (err) {
    console.error(err)
  }
}

export function* publishCommentFlow () {
  while (true) {
    let req = yield take(showActionType.PUBLISH_COMMENT)
    let res = yield call(publishComment, req.commentData)
    if (res) {
      res = JSON.parse(res)
      yield put({
        type: showActionType.PUBLISH_COMMENT_RESULT,
        result: res.status
      })
    }
  }
}

export function* tagCheck (tag) {
  try {
    return yield post('/show/tagCheck', {tag})
  } catch (err) {
    console.error(err)
  }
}

export function* tagCheckFlow () {
  while (true) {
    let req = yield take(showActionType.CHECK_TAG)
    let res = yield call(tagCheck, req.tag)
    if (res) {
      res = JSON.parse(res)
      if (res.status) {
        yield put({
          type: showActionType.CHECK_TAG_RESULT,
          status: true,
          info: res.info,
        })
      } else {
        yield put({
          type: showActionType.CHECK_TAG_RESULT,
          status: false
        })
      }
    }
  }
}

export function* getInfo () {
  try {
    return yield post('/show/getInfo')
  } catch (err) {
    console.error(err)
  }
}

export function* getInfoFlow () {
  while (true) {
    yield take(showActionType.GET_INFO)
    let res = yield call(getInfo)
    if (res) {
      res = JSON.parse(res)
      yield put({
        type: showActionType.GET_INFO_RESULT,
        info: res.info
      })
    }
  }
}