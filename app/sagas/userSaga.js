import {put, take, call, fork} from 'redux-saga/effects'
import {get, post} from './fetch'
import {actionTypes} from '../reducers/index'

export function* getUsers() {
  yield put({type: actionTypes.GET_ALL_USERS});
  try {
    let res =  yield call(get, '/user');
    if(res) {
      yield put({type: actionTypes.GET_ALL_USERS, data: JSON.parse(res)})
    }
  } catch (error) {
    console.log('aaaaa');
  }
}
