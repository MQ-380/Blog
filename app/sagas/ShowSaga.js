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
      })
    } else {
      yield put({
        type: showActionType.CHECK_USER_RESULT, result: false,
        userPublicInfo: {}
      })
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
          fullInfo: res.fullInfo,
        })
      }
    } else {
      yield put({type: showActionType.ARTICLE_AND_COMMENT, result: false, fullInfo: {}})
    }
  }
}
