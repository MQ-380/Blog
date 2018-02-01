import {put, take, call} from 'redux-saga/effects'
import {get, post} from './fetch'
import {actionTypes as IndexTypes} from '../reducers/index'
import {actionTypes as actionTypes} from '../reducers/UserAction'

export function* getUsers() {

  yield put({type: IndexTypes.FETCH_START});
    try {
      return yield call(get, '/admin/user');
    } catch (error) {
      console.log('aaaaa');
    } finally {
      yield put({type: IndexTypes.FETCH_END});
    }
}

export function* getUserFlow() {
  while(true) {
    let req = yield take(actionTypes.GET_ALL_USERS);
    let res  = yield getUsers();
    if(res) {
      yield put({type: actionTypes.GET_ALL_USERS_RES, data: JSON.parse(res)})
    }
  }
}

export function* addUser(data) {
  yield put({type: IndexTypes.FETCH_START});
  try {
    return yield call(post, '/admin/addUser', data);
  } catch (err) {
    yield put({type: IndexTypes.SET_MESSAGE, msgType:'失败', msgContent: '添加用户失败', alertType: 'error'})
  } finally {
    yield put({type: IndexTypes.FETCH_END});
  }
}


export function* addUsersFlow() {
  while(true) {
    let req = yield take(actionTypes.ADD_NEW_USERS);
    if(req) {
      let res = yield call(addUser, req);
      if(res) {
        res = JSON.parse(res);
        if(res.code === 0) {
          yield put({type: actionTypes.REGISTER_SUCCESS});
        } else {
         yield put({type: IndexTypes.SET_MESSAGE, msgType:'失败', msgContent: '添加用户失败', alertType: 'error'});
        }
      }
    }
  }
}




export function* editUser(data) {
  yield put({type: IndexTypes.FETCH_START})
  try {
    return yield call(post, '/admin/editUser',data);
  } catch(err) {
    yield put({type: IndexTypes.SET_MESSAGE, msgContent:'error', msgType: '0'})
  } finally {
    yield put({type: IndexTypes.FETCH_END});
  }
}

export function* editUsersFlow() {
  while(true) {
    let req = yield take(actionTypes.EDIT_NAME);

    if(req.name === '' || req.name === undefined) {
      yield put({type: IndexTypes.SET_MESSAGE, msgContent:'empty name', msgType: '0', alertType: 'error'});
    }
    if(req.name) {
      let data = {_id: req._id,name: req.name, editTime: req.editTime}
      let res = yield call(editUser, data);
      if(res) {
        res = JSON.parse(res);
        if(res.code === 0) {
          yield put({type: IndexTypes.SET_MESSAGE, msgContent: 'success!', msgType: '1', alertType: 'success'});
          setTimeout(function () {
            location.replace('/')
          }, 500);
        } else {
          yield put({type: IndexTypes.SET_MESSAGE, msgContent:'net error', msgType: '0',alertType: 'error'})
        }
      }
    }
  }
}

export function* deleteUsers(_id) {
  yield put({type: IndexTypes.FETCH_START});
  try {
    return yield call(post, '/admin/deleteUser', _id);
  } catch(err){
    yield put({type: IndexTypes.SET_MESSAGE, msgContent:'error', msgType: '0',alertType: 'error'})
  } finally {

    yield put({type: IndexTypes.FETCH_END});
  }
}

export function* deleteUsersFlow() {
  while(true) {
    let req = yield take(actionTypes.DELETE_ITEM);
    let res = yield call(deleteUsers, {_id:req._id});
    res = JSON.parse(res);
    if(res.code === 0) {
      yield put({type: IndexTypes.SET_MESSAGE, msgContent: 'success!', msgType: '1',alertType: 'success'});
      setTimeout(function () {
        location.replace('/')
      }, 500);
    } else {
      yield put({type: IndexTypes.SET_MESSAGE, msgContent:'net error', msgType: '0',alertType: 'error'})
    }
  }
}
