const initialState = {
  userExists: false,
  userPublicInfo: {
    visitUser: false,
    slogan: '',
    links: {}
  }
};

export const actionTypes = {
  CHECK_USER: 'CHECK_USER',
  CHECK_USER_RESULT: 'CHECK_USER_RESULT',
  SET_USER_RESULT: 'SET_USER_RESULT'
}

export const action = {
  check_user: (username) => {
    return {
      type: actionTypes.CHECK_USER,
      username
    }
  },
  set_check: (result) => {
    return {
      type: actionTypes.SET_USER_RESULT,
      result
    }
  }
}

export function reducer(state=initialState, action){
  switch (action.type) {
    case actionTypes.CHECK_USER_RESULT:
      return {
        ...state,
        userExists: action.result,
        userPublicInfo:{
          visitUser: true,
          slogan: action.slogan,
          links: action.links
        }
      }
    case actionTypes.SET_USER_RESULT:
      return {
        ...state,
        userExists: action.result,
      }
    default:
      return state;
  }
}
