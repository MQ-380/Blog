const initialState = {
  userExists: false,
  userPublicInfo: {
    username: '',
    slogan: '',
    links: {}
  }
};

export const actionTypes = {
  CHECK_USER: 'CHECK_USER',
  CHECK_USER_RESULT: 'CHECK_USER_RESULT'
};

export const action = {
  check_user: username => {
    return {
      type: actionTypes.CHECK_USER,
      username
    };
  }
};

export function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHECK_USER_RESULT:
      return {
        ...state,
        userExists: action.result,
        userPublicInfo: {
          username: action.username,
          slogan: action.slogan,
          links: action.links
        }
      };
    default:
      return state;
  }
}
