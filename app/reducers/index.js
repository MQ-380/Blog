import {combineReducers} from 'redux'
import {reducer as UserReducer} from '../reducers/UserAction'

const initialState = {
  isAdminLogin: false,
  isLogin: false,
  isFetching: false,
  username: '',
  user_Id: '',
  msg: {
    title: '',
    content: '',
    type: ''
  },
  page: 'user'
};

export const actionTypes = {
  LOGIN: "LOGIN",
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAIL: 'LOGOUT_FAIL',
  CHECK_LOGIN: 'CHECK_LOGIN',
  CHECK_TRUE: 'CHECK_TRUE',
  CHECK_FALSE: 'CHECK_FALSE',
  SET_MESSAGE: "SET_MESSAGE",
  FETCH_START: "FETCH_START",
  FETCH_END: "FETCH_END",
  CLEAR_MSG: 'CLEAR_MSG',
  CHANGE_PAGE: 'CHANGE_PAGE',
}

export const action = {
  login: (username, password) => {
    return {
      type: actionTypes.LOGIN,
      username,
      password
    }
  },
  logout: (username) => {
    return {
      type: actionTypes.LOGOUT,
      username
    }
  },
  check_login: (token) => {
    return {
      type: actionTypes.CHECK_LOGIN,
      token
    }
  },
  clear_msg: () => {
    return {
      type: actionTypes.CLEAR_MSG
    }
  },
  change_page: (page) => {
    return {
      type: actionTypes.CHANGE_PAGE,
      page
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
          title: action.msgType,
          content: action.msgContent,
          type: action.alertType
        }
      }
    case actionTypes.CLEAR_MSG:
      return {
        ...state,
        msg: {
          type: '',
          content: '',
          title: ''
        }
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        username: action.username,
        user_Id: action.id,
        isAdminLogin: action.isAdmin
      }
    case actionTypes.CHECK_TRUE:
      return {
        ...state,
        isLogin: true,
        username: action.username,
        user_Id: action.id,
        isAdminLogin: action.isAdmin
      }
    case actionTypes.CHECK_FALSE:
      return {
        ...state,
        isLogin: false,
        msg: {
          title: '登录状态错误',
          content:action.msg,
          type: action.alertType,
        }
      }
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLogin: false,
        username: '',
        isAdminLogin: false
      }
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        msg: {
          title: '登录错误',
          content:action.msg,
          type: action.alertType
        }
      }
    case actionTypes.CHANGE_PAGE:
      return {
        ...state,
        page: action.page,
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