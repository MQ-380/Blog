const initialState = {
  now_user: {
    username: '',
    slogan: ''
  },
  isLogin: false,
  login_fail_message: {
    show: false,
    type: '',
    content: '',
    title: ''
  }
};

export const actionTypes = {
  NORMAL_LOGIN: 'NORMAL_LOGIN',
  NORMAL_LOGIN_SUCCESS: 'NORMAL_LOGIN_SUCCESS',
  NORMAL_LOGIN_FAIL: 'NORMAL_LOGIN_FAIL'
}

export const action = {
  normal_login: (username, password) => {
    return {
      type: actionTypes.NORMAL_LOGIN,
      data:
        {username, password}
    }
  }
}

export function reducer(state=initialState, action){
  switch (action.type) {
    case actionTypes.NORMAL_LOGIN_SUCCESS:
      return {
        ...state,
        now_user: action.userInfo,
        isLogin: true
      }
    case actionTypes.NORMAL_LOGIN_FAIL:
      return {
        ...state,
        login_fail_message: {
          show: true,
          type: action.alertType,
          content: action.content,
          title: action.title
        }
      }
    default:
      return state;
  }
}
