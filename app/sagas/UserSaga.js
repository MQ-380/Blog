import { put, take, call } from 'redux-saga/effects'
import { get, post } from './fetch'
import { actionTypes as IndexTypes } from '../reducers/AdminAction'
import { actionTypes as actionTypes } from '../reducers/UserAction'

export function* getUsers () {

  yield put({type: IndexTypes.FETCH_START})
  try {
    return yield call(get, '/admin/user')
  } catch (error) {
    console.log('aaaaa')
  } finally {
    yield put({type: IndexTypes.FETCH_END})
  }
}

export function* getUserFlow () {
  while (true) {
    let req = yield take(actionTypes.GET_ALL_USERS)
    let res = yield getUsers()
    if (res) {
      yield put({type: actionTypes.GET_ALL_USERS_RES, data: JSON.parse(res)})
    }
  }
}

export function* addUser (data) {
  yield put({type: IndexTypes.FETCH_START})
  try {
    return yield call(post, '/admin/addUser', data)
  } catch (err) {
    yield put({type: IndexTypes.SET_MESSAGE, msgType: '失败', msgContent: '添加用户失败', alertType: 'error'})
  } finally {
    yield put({type: IndexTypes.FETCH_END})
  }
}

export function* addUsersFlow () {
  while (true) {
    let req = yield take(actionTypes.ADD_NEW_USERS)
    if (req) {
      let res = yield call(addUser, req)
      if (res) {
        res = JSON.parse(res)
        if (res.code === 0) {
          yield put({type: actionTypes.REGISTER_SUCCESS})
        } else {
          yield put({type: IndexTypes.SET_MESSAGE, msgType: '失败', msgContent: '添加用户失败', alertType: 'error'})
        }
      }
    }
  }
}

export function* editUser (data) {
  yield put({type: IndexTypes.FETCH_START})
  try {
    return yield call(post, '/admin/editUser', data)
  } catch (err) {
    yield put({type: actionTypes.EDIT_RESULT, content: '修改用户信息失败', title: '修改失败', alertType: 'error'})
  } finally {
    yield put({type: IndexTypes.FETCH_END})
  }
}

export function* editUsersFlow () {
  while (true) {
    let req = yield take(actionTypes.EDIT_USER_INFO);
    let res = yield call(editUser, {_id: req.userId, newEmail:req.newEmail});
    if (res && JSON.parse(res).status) {
      yield put({type: actionTypes.EDIT_RESULT, content: '修改用户信息成功', title: '修改成功', alertType: 'success'})
      yield put({type: IndexTypes.CHANGE_EMAIL, email: JSON.parse(res).email})
    } else {
      yield put({type: actionTypes.EDIT_RESULT, content: '修改用户信息失败', title: '修改失败', alertType: 'error'})
    }
  }
}

export function* deleteUsers (_id) {
  yield put({type: IndexTypes.FETCH_START})
  try {
    return yield call(post, '/admin/deleteUser', _id)
  } catch (err) {
    yield put({type: actionTypes.DELETE_FAILED, content: `删除错误，部分或全部用户未被删除`, title: '删除失败', alertType: 'error'})
  } finally {
    yield put({type: IndexTypes.FETCH_END})
  }
}

export function* deleteUsersFlow () {
  while (true) {
    let req = yield take(actionTypes.DELETE_ITEM)
    let res = yield call(deleteUsers, {_id: req._ids})
    res = JSON.parse(res)
    if (res.code === 0) {
      yield put({type: actionTypes.TO_SHOW_DELETE, toShow: false})
    } else {
      yield put({type: actionTypes.DELETE_FAILED, content: `删除错误，部分或全部用户未被删除`, title: '删除失败', alertType: 'error'})
    }
  }
}

export function* editPassword (userId, oldPass, newPass) {
  yield put({type: IndexTypes.FETCH_START})
  try {
    return yield call(post, '/admin/editPassword', userId, oldPass, newPass)
  } catch (err) {
    yield put({type: actionTypes.EDIT_RESULT, content: `修改失败`, title: '修改失败', alertType: 'error'})
  } finally {
    yield put({type: IndexTypes.FETCH_END})
  }
}

export function* editPasswordFlow () {
  while (true) {
    let req = yield take(actionTypes.EDIT_PASSWORD)
    let res = yield call(editPassword, {userId: req.userId, oldPass: req.oldPass, newPass: req.newPass})
    if (res) {
      res = JSON.parse(res)
      if (!res.status) {
        yield put({type: actionTypes.EDIT_RESULT, content: res.msg, title: '失败', alertType: 'error'})
      } else {
        yield put({type: actionTypes.EDIT_RESULT, content: res.msg, title: '成功', alertType: 'success'})
      }
    }
  }
}