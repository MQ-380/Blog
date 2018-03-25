const initialState = {
  publish_type: 'md',
  show_tags: false,
  file_name: '',
  article_name: {value: ''},
  article_list: [],
  link_name: {value: ''},
  upload_message: {
    show: false,
    type: '',
    content: '',
    title: ''
  },
  delete_message: {
    show: false,
    type: '',
    content: '',
    title: ''
  },
  review_message: {
    show: false,
    type: '',
    content: '',
    title: ''
  },
  show_delete: false,
  after_delete: false,
  article_content: '',
  content_type: ''
};

export const actionTypes = {
  CHANGE_PUBLISH_TYPE: 'CHANGE_PUBLISH_TYPE',
  SHOW_TAGS: 'SHOW_TAGS',
  SET_FILE_NAME: 'SET_NAME_NAME',
  SET_LINK_NAME: 'SET_LINK_NAME',
  SET_ARTICLE_NAME: 'SET_ARTICLE_NAME',
  UPLOAD_INFO: 'UPLOAD_INFO',
  PUBLISH_ARTICLE: 'PUBLISH_ARTICLE',
  CANCEL_UPLOAD: 'CANCEL_UPLOAD',
  PUBLISH_RESULT: 'PUBLISH_RESULT',
  CLEAR_PUBLISH_SUCCESS_RESULT: 'CLEAR_PUBLISH_SUCCESS_RESULT',
  CLEAR_PUBLISH_FAIL_RESULT: 'CLEAR_PUBLISH_SUCCESS_RESULT',
  GET_ARTICLE_LIST: 'GET_ARTICLE_LIST',
  ARTICLE_LIST_RESULT: 'ARTICLE_LIST_RESULT',
  SHOW_DELETE_ARTICLE_CONFIRM:'SHOW_DELETE_ARTICLE_CONFIRM',
  DELETE_ARTICLE: 'DELETE_ARTICLE',
  DELETE_ARTICLE_RESULT: 'DELETE_ARTICLE_RESULT',
  CLEAR_DELETE_RESULT: 'CLEAR_DELETE_RESULT',
  GET_ARTICLE_CONTENT: 'GET_ARTICLE_CONTENT',
  SET_ARTICLE_CONTENT: 'SET_ARTICLE_CONTENT',
  COMMENT_REVIEW: 'COMMENT_REVIEW',
  COMMENT_REVIEW_FAILED: 'COMMENT_REVIEW_FAILED',
  COMMENT_REVIEW_SUCCESS: 'COMMENT_REVIEW_SUCCESS',
  CLEAR_REVIEW_FAILED_MESSAGE: 'CLEAR_REVIEW_FAILED_MESSAGE',
  CLEAR_ARTICLE_INFO: 'CLEAR_ARTICLE_INFO',
  EDIT_ARTICLE: 'EDIT_ARTICLE',
  EDIT_ARTICLE_RESULT: 'EDIT_ARTICLE_RESULT',
  CLEAR_EDIT_RESULT_MESSAGE: 'CLEAR_EDIT_RESULT_MESSAGE',
  EDIT_UPLOAD_INFO: 'EDIT_UPLOAD_INFO'
}

export const action = {
  change_type: (publishType) => {
    return {
      type: actionTypes.CHANGE_PUBLISH_TYPE,
      publishType
    }
  },
  show_tags: (show) => {
    return {
      type: actionTypes.SHOW_TAGS,
      show
    }
  },
  set_article_name: (name) => {
    return {
      type: actionTypes.SET_ARTICLE_NAME,
      name
    }

  },
  set_file_name: (name) => {
    return {
      type: actionTypes.SET_FILE_NAME,
      name
    }
  },
  set_link_name: (name) => {
    return {
      type: actionTypes.SET_LINK_NAME,
      name
    }
  },
  upload_info: (fileName, linkName, articleName, tags, writer) => {
    return {
      type: actionTypes.UPLOAD_INFO,
      fileName,
      linkName,
      articleName,
      tags,
      writer
    }
  },
  clear_publish_msg: (success) => {
    return {
      type: success? actionTypes.CLEAR_PUBLISH_SUCCESS_RESULT : actionTypes.CLEAR_PUBLISH_FAIL_RESULT,
      success
    }
  },
  cancel_upload: (fileName) => {
    return {
      type: actionTypes.CANCEL_UPLOAD,
      fileName,
    }
  },
  get_article_list: () => {
    return {
      type: actionTypes.GET_ARTICLE_LIST,
    }
  },
  show_article_delete_confirm: (show) => {
    return {
      type: actionTypes.SHOW_DELETE_ARTICLE_CONFIRM,
      show
    }
  },
  delete_article: (articleId) => {
    return {
      type: actionTypes.DELETE_ARTICLE,
      articleId
    }
  },
  clear_delete_message: () => {
    return {
      type: actionTypes.CLEAR_DELETE_RESULT,
    }
  },
  get_article_content: (_id) => {
    return {
      type: actionTypes.GET_ARTICLE_CONTENT,
      _id
    }
  },
  comment_review: (commentId, articleId, passed) => {
    return {
      type: actionTypes.COMMENT_REVIEW,
      commentId,
      articleId,
      passed
    }
  },
  clear_review_failed: () => {
    return {
      type: actionTypes.CLEAR_REVIEW_FAILED_MESSAGE
    }
  },
  upload_article:(title, content, contentType, tags, writer, linkName) => {
    return {
      type: actionTypes.PUBLISH_ARTICLE,
      articleData: {
        title,content,contentType,tags,writer,linkName
      }
    }
  },
  clear_article_info: ()=> {
    return {
      type: actionTypes.CLEAR_ARTICLE_INFO,
    }
  },
  edit_article: (id,articleName, linkName, content, tags) => {
    return {
      type: actionTypes.EDIT_ARTICLE,
      data:
        {id, articleName, linkName, content, tags}
    }
  },
  clear_result_msg: () => {
    return {
      type: actionTypes.CLEAR_EDIT_RESULT_MESSAGE
    }
  },
  edit_upload_info: (title, newFile, oldFile, tags, linkName, writer, id) => {
    return {
      type: actionTypes.EDIT_UPLOAD_INFO,
      data:
        {title, newFile, oldFile, tags, linkName, writer, id}
    }
  }
}

export function reducer(state=initialState, action) {
  switch(action.type) {
    case actionTypes.CHANGE_PUBLISH_TYPE:
      return {
        ...state,
        publish_type: action.publishType,
        show_tags: false,
        file_name: '',
        link_name: {value: ''}
      }
    case actionTypes.SHOW_TAGS:
      return {
        ...state,
        show_tags: action.show
      }
    case actionTypes.SET_FILE_NAME:
      return {
        ...state,
        file_name: action.name
      }
    case actionTypes.SET_LINK_NAME:
      return {
        ...state,
        link_name: action.name
      }
    case actionTypes.SET_ARTICLE_NAME:
      return {
        ...state,
        article_name: action.name
      }
    case actionTypes.PUBLISH_RESULT:
      return {
        ...state,
        upload_message: {
          show: true,
          type: action.alertType,
          content: action.content,
          title: action.title
        },
      }
    case actionTypes.CLEAR_PUBLISH_SUCCESS_RESULT: {
      return {
        ...state,
        show_tags: !action.success,
        file_name: '',
        article_name: {value: ''},
        link_name: {value: ''},
        upload_message: {
          show: false,
          type: '',
          content: '',
          title: ''
        },
      }
    }
    case actionTypes.CLEAR_PUBLISH_FAIL_RESULT: {
      return {
        ...state,
        upload_message: {
          show: false,
          type: '',
          content: '',
          title: ''
        },
      }
    }
    case actionTypes.ARTICLE_LIST_RESULT: {
      return {
        ...state,
        article_list: action.list,
        after_delete: false
      }
    }
    case actionTypes.SHOW_DELETE_ARTICLE_CONFIRM: {
      return {
        ...state,
        show_delete: action.show,
        after_delete: !action.show,
      }
    }
    case actionTypes.DELETE_ARTICLE_RESULT: {
      return {
        ...state,
        delete_message: {
          show: true,
          type: action.alertType,
          content: action.content,
          title: action.title
        },
      }
    }
    case actionTypes.CLEAR_DELETE_RESULT: {
      return {
        ...state,
        delete_message: {
          show: false,
          type: '',
          content: '',
          title: ''
        }
      }
    }
    case actionTypes.SET_ARTICLE_CONTENT: {
      return {
        ...state,
        article_content: action.content,
        content_type: action.fileType
      }
    }
    case actionTypes.COMMENT_REVIEW_FAILED: {
      return {
        ...state,
        review_message:{
          show: true,
          type: action.alertType,
          content: action.content,
          title: action.title
        }
      }
    }
    case actionTypes.CLEAR_REVIEW_FAILED_MESSAGE: {
      return {
        ...state,
        review_message:{
          show: false,
          type: '',
          content: '',
          title: ''
        }
      }
    }
    case actionTypes.COMMENT_REVIEW_SUCCESS: {
      return {
        ...state,
        article_list: state.article_list.map((item) => {
          if(item._id === action.articleId) {
            item.comment = action.comment
          }
          return item;
        })
      }
    }
    case actionTypes.CLEAR_ARTICLE_INFO: {
      return {
        ...state,
        article_content: '',
        content_type: '',
      }
    }
    case actionTypes.EDIT_ARTICLE_RESULT: {
      return {
        ...state,
        edit_article_result_message:{
          show: true,
          type: action.alertType,
          content: action.content,
          title: action.title
        }
      }
    }
    case actionTypes.CLEAR_EDIT_RESULT_MESSAGE: {
      return {
        ...state,
        edit_article_result_message:{
          show: false,
          type: '',
          content: '',
          title: ''
        }
      }
    }
    default:
      return {
          ...state
      }
  }
}