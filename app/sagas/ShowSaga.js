import { put, take, call } from 'redux-saga/effects'
import { get, post } from './fetch'
import { actionTypes as ShowActionType } from '../reducers/ShowAction'
import { actionTypes } from '../reducers/PublishAction'

export function* checkUserExists(username) {
  try {
    console.log(username)
    return yield post('/show/checkUser', username)
  } catch (err) {
    console.error(err);
  }
}

export function* checkUserExistsFlow() {
  while (true) {
    let req = yield take(ShowActionType.CHECK_USER);
    console.log(req.username)
    let res = yield call(checkUserExists, {username: req.username})
    if (res) {
      res = JSON.parse(res);
      yield put({
        type: ShowActionType.CHECK_USER_RESULT,
        result: res.status,
        slogan: res.slogan,
        links: res.links,
        username: req.username
      })
    } else {
      yield put({type: ShowActionType.CHECK_USER_RESULT, result: false})
    }
  }
}
