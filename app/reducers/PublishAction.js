const initialState = {
  publish_type: 'md',
  show_tags: false,
  file_name: '',
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
  UPLOAD_INFO: 'UPLOAD_INFO',
  PUBLISH_SUCCESS: 'PUBLISH_SUCCESS'
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
  upload_info: (fileName, linkName, tags) => {
    return {
      type: actionTypes.UPLOAD_INFO,
      fileName,
      linkName,
      tags
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
    case actionTypes.PUBLISH_SUCCESS:
      return {
        ...state,

      }
    default:
      return {
          ...state
      }
  }
}