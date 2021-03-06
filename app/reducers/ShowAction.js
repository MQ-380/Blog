const initialState = {
  userExists: false,
  userPublicInfo: {
    username: '',
    slogan: '',
    links: {},
    articleTags: [],
    allArticles: [],
    tagName: ''
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
  },
  publish_comment_result: {
    isPublished: false,
    publishResult: false
  },
  isFetching: true,
  tagExists: false,
  tagPublicInfo: {
    tagName: '',
    allArticles: []
  },
  info: {
    writers: [],
    articles: [],
    tags: []
  }
};

export const actionTypes = {
  CHECK_USER: 'CHECK_USER',
  CHECK_USER_RESULT: 'CHECK_USER_RESULT',
  GET_ARTICLE_INFO: 'GET_ARTICLE_INFO',
  ARTICLE_AND_COMMENT: 'ARTICLE_AND_COMMENT',
  PUBLISH_COMMENT: 'PUBLISH_COMMENT',
  PUBLISH_COMMENT_RESULT: 'PUBLISH_COMMENT_RESULT',
  CLEAR_COMMENT_RESULT: 'CLEAR_COMMENT_RESULT',
  CHECK_TAG: 'CHECK_TAG',
  CHECK_TAG_RESULT: 'CHECK_TAG_RESULT',
  GET_INFO: 'GET_INFO',
  GET_INFO_RESULT: 'GET_INFO_RESULT'
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
  },
  upload_comment: commentData => {
    return {
      type: actionTypes.PUBLISH_COMMENT,
      commentData
    }
  },
  close_result_message: () => {
    return {
      type: actionTypes.CLEAR_COMMENT_RESULT
    }
  },
  check_tags: tag => {
    return {
      type: actionTypes.CHECK_TAG,
      tag
    }
  },
  get_info: () => {
    return {
      type: actionTypes.GET_INFO
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
        isFetching: false,
        articleResult: action.result,
        articleDisplayInfo: action.fullInfo
      }
    case actionTypes.PUBLISH_COMMENT_RESULT:
      return {
        ...state,
        publish_comment_result: {
          isPublished: true,
          publishResult: action.result
        }
      }
    case actionTypes.CLEAR_COMMENT_RESULT:
      return {
        ...state,
        publish_comment_result: {
          isPublished: false,
          publishResult: false
        }
      }
    case actionTypes.CHECK_TAG_RESULT:
      return {
        ...state,
        tagExists: action.status,
        userPublicInfo: action.info
      }
    case actionTypes.GET_INFO_RESULT:
      return {
        ...state,
        info: action.info
      }
    default:
      return state;
  }
}
