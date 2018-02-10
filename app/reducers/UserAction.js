const initialState = {
  userList: [],
  show_register: false,
  after_register: false,
  show_delete: false,
  show_edit_password: false,
  delete_msg: {
    show: false,
    type: '',
    content:'',
    title: ''
  }
}

export const actionTypes = {
  GET_ALL_USERS: "GET_ALL_USERS",
  ADD_NEW_USERS: "ADD_NEW_USERS",
  ADD_NEW_ADMIN: "ADD_NEW_ADMIN",
  GET_ALL_USERS_RES: "GET_ALL_USERS_RES",
  EDIT_NAME: "EDIT_NAME",
  UPDATING_NAME: 'UPDATING_NAME',
  DELETE_ITEM: 'DELETE_ITEM',
  REGISTER_CONTROL: 'REGISTER_CONTROL',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILED: 'REGISTER_FAILED',
  TO_SHOW_DELETE: 'TO_SHOW_DELETE',
  TO_EDIT_PASSWORD: 'TO_EDIT_PASSWORD',
  DELETE_FAILED: 'DELETE_FAILED',
  EDIT_PASSWORD: 'EDIT_PASSWORD',
  CLEAR_MSG: 'CLEAR_MSG',
}

export const action = {
  get_all_users: () => {
    return{
      type: actionTypes.GET_ALL_USERS
    }
  },
  add_new_users: (userName) => {
    return {
      type: actionTypes.ADD_NEW_USERS,
      userName,
      time: new Date()
    }
  },
  add_new_admin: (username, password, email) => {
    return {
      type: actionTypes.ADD_NEW_USERS,
      username,
      password,
      email,
      isAdmin: true,
      auth: 'admin'
    }
  },
  updating_name: (name) => {
    return {
      type: actionTypes.UPDATING_NAME,
      name
    }
  },
  edit_name: (_id, name) => {
    return {
      type: actionTypes.EDIT_NAME,
      _id,
      name,
      editTime: new Date()
    }
  },
  delete_item: (_ids) => {
    return {
      type: actionTypes.DELETE_ITEM,
      _ids
    }
  },
  register_control: (show) => {
    return {
      type: actionTypes.REGISTER_CONTROL,
      show
    }
  },
  to_show_delete: (toShow) => {
    return {
      type: actionTypes.TO_SHOW_DELETE,
      toShow
    }
  },
  clear_msg: () => {
    return {
      type: actionTypes.CLEAR_MSG
    }
  },
  edit_password: (toEdit) => {
    return {
      type: actionTypes.TO_EDIT_PASSWORD,
      toEdit
    }
  },
  edit_user_password: (userId, oldPass, newPass) => {
    return {
      type: actionTypes.EDIT_PASSWORD,
      userId,
      oldPass,
      newPass
    }
  }
}

export function reducer(state=initialState, action){
  switch (action.type) {
    case actionTypes.GET_ALL_USERS_RES:
      return {
        ...state,
        userList: action.data,
        after_register: false
      }
    case actionTypes.REGISTER_CONTROL:
      return {
        ...state,
        show_register: action.show
      }
    case actionTypes.UPDATING_NAME:
      return {
        ...state,
        editingName: action.name
      }
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        show_register: false,
        after_register: true
      }
    case actionTypes.TO_SHOW_DELETE:
      return {
        ...state,
        show_delete: action.toShow,
        after_register: !action.toShow,
      }
    case actionTypes.DELETE_FAILED:
      return {
        ...state,
        delete_msg: {
          show: true,
          type: action.alertType,
          content: action.content,
          title: action.title
        }
      }
    case actionTypes.CLEAR_MSG:
      return {
        ...state,
        delete_msg: {
          show: false,
          type: '',
          content:'',
          title: ''
        }
      }
    case actionTypes.TO_EDIT_PASSWORD:
      return {
        ...state,
        show_edit_password: action.toEdit
      }
    default:
      return state;
  }
}
