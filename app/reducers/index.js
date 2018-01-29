import {combineReducers} from 'redux'
import {reducer as UserReducer} from '../reducers/UserAction'

const initialState = {
  isAdminLogin: false,
  isLogin: false,
  isFetching: false,
  username: '',
  msg: {
    type: 1,//0失败 1成功
    content: ''
  }
};

export const actionTypes = {
  LOGIN: "LOGIN",
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  CHECK_LOGIN: 'CHECK_LOGIN',
  CHECK_TRUE: 'CHECK_TRUE',
  CHECK_FALSE: 'CHECK_FALSE',
  SET_MESSAGE: "SET_MESSAGE",
  FETCH_START: "FETCH_START",
  FETCH_END: "FETCH_END"
}

export const action = {
  login: (username, password) => {
    return {
      type: actionTypes.LOGIN,
      username,
      password
    }
  },
  check_login: (token) => {
    return {
      type: actionTypes.CHECK_LOGIN,
      token
    }
  }
}

export function reducer(state=initialState, action){
  switch (action.type) {
    case actionTypes.FETCH_START:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.FETCH_END:
      return {
        ...state,
        isFetching: false
      }
    case actionTypes.SET_MESSAGE:
      return {
        ...state,
        isFetching: false,
        msg: {
          type: action.msgType,
          content: action.msgContent
        }
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        username: action.data.username,
        isAdminLogin: action.isAdmin
      }
    case actionTypes.CHECK_TRUE:
      return {
        ...state,
        isLogin: true,
        username: action.username,
        isAdminLogin: action.isAdmin
      }
    case actionTypes.CHECK_FALSE:
      return {
        ...state,
        isLogin: false,
        msg: {type: 1, content:action.msg}
      }
    default:
      return state;
  }
}

const root =  combineReducers({
  user: UserReducer,
  global:reducer
})

export default root;