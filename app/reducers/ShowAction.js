const initialState = {
  userExists: false,
  userPublicInfo: {
    username: '',
    slogan: '',
    links: {},
    articleTags: [],
    allArticles: []
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
        userPublicInfo: action.userPublicInfo
      };
    default:
      return state;
  }
}
