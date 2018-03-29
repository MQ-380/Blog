const initialState = {
  userExists: false,
  userPublicInfo: {
    username: '',
    slogan: '',
    links: {},
    articleTags: [],
    allArticles: []
  },
  articleResult: false,
  articleDisplayInfo: {
    _id: '',
    articleName: '',
    fileType: '',
    writer: '',
    createTime: '',
    editTime: '',
    tags: '',
    content: '',
    linkName: '',
    comment: []
  }
};

export const actionTypes = {
  CHECK_USER: 'CHECK_USER',
  CHECK_USER_RESULT: 'CHECK_USER_RESULT',
  GET_ARTICLE_INFO: 'GET_ARTICLE_INFO',
  ARTICLE_AND_COMMENT: 'ARTICLE_AND_COMMENT'
};

export const action = {
  check_user: username => {
    return {
      type: actionTypes.CHECK_USER,
      username
    };
  },
  get_article_info: linkName => {
    return {
      type: actionTypes.GET_ARTICLE_INFO,
      linkName
    }
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
    case actionTypes.ARTICLE_AND_COMMENT:
      return {
        ...state,
        articleResult: action.result,
        articleDisplayInfo: action.fullInfo
      }
    default:
      return state;
  }
}
