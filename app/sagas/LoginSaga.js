import {put, take, call} from 'redux-saga/effects'
import {get, post} from './fetch'
import {actionTypes as IndexTypes} from '../reducers/index'
import {actionTypes as actionTypes} from '../reducers/UserAction'


export function* adminLogin(data) {
  yield put({type: IndexTypes.FETCH_START})
  try {
    return yield post('/login', data);
  }catch(err) {
    console.error(err);
  }finally {
    yield put({type: IndexTypes.FETCH_END})
  }
}

export function* adminLoginFlow () {
  while(true) {
    let req = yield take(IndexTypes.LOGIN);
    yield put({type: IndexTypes.CLEAR_MSG});
    const data = {username: req.username, password: req.password}
    let res = yield call(adminLogin, data);
    if (res) {
      res = JSON.parse(res)
      if (res.status) {
        let session = window.sessionStorage;
        session.token = res.token;
        yield put({type: IndexTypes.LOGIN_SUCCESS, username:data.username, isAdmin: res.isAdmin, id:res.id});
      } else {
        yield put({type: IndexTypes.LOGIN_FAILED, msg: res.msg, alertType: 'error'});
      }
    } else {
      yield put({type: IndexTypes.LOGIN_FAILED, msg: '请检查网络连接', alertType: 'error'});
    }
  }
}

export function* checkLogin(data) {
  try {
    return yield post('/loginCheck', data);
  } catch(err) {
    console.error(error);
  }
}

export function* checkLoginFlow() {
  while(true) {
    let req = yield take(IndexTypes.CHECK_LOGIN);
    yield put({type: IndexTypes.CLEAR_MSG});
    const data  = {token: req.token};
    let res = yield call(checkLogin, data);
    if(res) {
      res = JSON.parse(res);
      if(res.status) {
        yield put({type: IndexTypes.CHECK_TRUE, isAdmin: res.isAdmin, username: res.username, id: res.id});
      } else {
        window.sessionStorage.clear();
        yield put({type: IndexTypes.CHECK_FALSE, msg: res.msg, alertType: 'error'});
      }
    }
  }
}

export function* logout(data) {
  try {
    return yield post('/logout', data);
  } catch(err) {
    console.error(err);
  }
}

export function* LogoutFlow() {
  while(true) {
    let req = yield take(IndexTypes.LOGOUT);
    const data = {username: req.username};
    let res = yield call(logout, data);
    if(res) {
      res = JSON.parse(res);
      if(res.status) {
        window.sessionStorage.clear();
        yield put({type: IndexTypes.LOGOUT_SUCCESS})
      } else {
        yield put({type: IndexTypes.LOGIN_FAILED, msg: res.message, alertType: 'error'})
      }
    } else {
      yield put({type: IndexTypes.LOGIN_FAILED, msg: res.message, alertType: 'error'})
    }
  }
}