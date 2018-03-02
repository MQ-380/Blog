const initialState = {
  publish_type: 'md',
  show_tags: true,
  file_name: '',
  article_name: {value: ''},
  link_name: {value: ''},
  upload_message: {
    show: false,
    type: '',
    content: '',
    title: ''
  },
};

export const actionTypes = {
  CHANGE_PUBLISH_TYPE: 'CHANGE_PUBLISH_TYPE',
  SHOW_TAGS: 'SHOW_TAGS',
  SET_FILE_NAME: 'SET_NAME_NAME',
  SET_LINK_NAME: 'SET_LINK_NAME',
  SET_ARTICLE_NAME: 'SET_ARTICLE_NAME',
  UPLOAD_INFO: 'UPLOAD_INFO',
  CANCEL_UPLOAD: 'CANCEL_UPLOAD',
  PUBLISH_RESULT: 'PUBLISH_RESULT',
  CLEAR_PUBLISH_SUCCESS_RESULT: 'CLEAR_PUBLISH_SUCCESS_RESULT',
  CLEAR_PUBLISH_FAIL_RESULT: 'CLEAR_PUBLISH_SUCCESS_RESULT'
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
  clear_msg: (success) => {
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
    default:
      return {
          ...state
      }
  }
}