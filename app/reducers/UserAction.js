const initialState = {
  userList: [],
  show_register: false,
  after_register: false,
  show_delete: false,
  show_edit: false,
  show_edit_password: false,
  edit_message: {
    show: false,
    type: '',
    content: '',
    title: ''
  },
  delete_msg: {
    show: false,
    type: '',
    content: '',
    title: ''
  }
};

export const actionTypes = {
  GET_ALL_USERS: "GET_ALL_USERS",
  ADD_NEW_USERS: "ADD_NEW_USERS",
  ADD_NEW_ADMIN: "ADD_NEW_ADMIN",
  GET_ALL_USERS_RES: "GET_ALL_USERS_RES",
  DELETE_ITEM: 'DELETE_ITEM',
  REGISTER_CONTROL: 'REGISTER_CONTROL',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILED: 'REGISTER_FAILED',
  TO_SHOW_DELETE: 'TO_SHOW_DELETE',
  TO_EDIT_INFO: 'TO_EDIT_INFO',
  TO_EDIT_PASSWORD: 'TO_EDIT_PASSWORD',
  DELETE_FAILED: 'DELETE_FAILED',
  EDIT_PASSWORD: 'EDIT_PASSWORD',
  EDIT_USER_INFO: 'EDIT_USER_INFO',
  CLEAR_MSG: 'CLEAR_MSG',
  EDIT_RESULT: 'EDIT_RESULT'
};

export const action = {
  get_all_users: () => {
    return {
      type: actionTypes.GET_ALL_USERS
    };
  },
  add_new_users: userName => {
    return {
      type: actionTypes.ADD_NEW_USERS,
      userName,
      time: new Date()
    };
  },
  add_new_admin: (username, password, email) => {
    return {
      type: actionTypes.ADD_NEW_USERS,
      username,
      password,
      email,
      isAdmin: true,
      auth: 'admin'
    };
  },
  delete_item: _ids => {
    return {
      type: actionTypes.DELETE_ITEM,
      _ids
    };
  },
  register_control: show => {
    return {
      type: actionTypes.REGISTER_CONTROL,
      show
    };
  },
  to_show_delete: toShow => {
    return {
      type: actionTypes.TO_SHOW_DELETE,
      toShow
    };
  },
  clear_msg: () => {
    return {
      type: actionTypes.CLEAR_MSG
    };
  },
  edit_password: toEdit => {
    return {
      type: actionTypes.TO_EDIT_PASSWORD,
      toEdit
    };
  },
  edit_user_password: (userId, oldPass, newPass) => {
    return {
      type: actionTypes.EDIT_PASSWORD,
      userId,
      oldPass,
      newPass
    };
  },
  show_edit_user_info: toEdit => {
    return {
      type: actionTypes.TO_EDIT_INFO,
      toEdit
    };
  },
  edit_user_info: (userId, newEmail) => {
    return {
      type: actionTypes.EDIT_USER_INFO,
      userId,
      newEmail
    };
  }
};

export function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS_RES:
      return {
        ...state,
        userList: action.data,
        after_register: false
      };
    case actionTypes.REGISTER_CONTROL:
      return {
        ...state,
        show_register: action.show
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        show_register: false,
        after_register: true
      };
    case actionTypes.TO_SHOW_DELETE:
      return {
        ...state,
        show_delete: action.toShow,
        after_register: !action.toShow
      };
    case actionTypes.DELETE_FAILED:
      return {
        ...state,
        delete_msg: {
          show: true,
          type: action.alertType,
          content: action.content,
          title: action.title
        }
      };
    case actionTypes.CLEAR_MSG:
      return {
        ...state,
        delete_msg: {
          show: false,
          type: '',
          content: '',
          title: ''
        },
        edit_message: {
          show: false,
          type: '',
          content: '',
          title: ''
        }
      };
    case actionTypes.TO_EDIT_PASSWORD:
      return {
        ...state,
        show_edit_password: action.toEdit,
        after_register: !action.toEdit
      };
    case actionTypes.TO_EDIT_INFO:
      return {
        ...state,
        show_edit: action.toEdit,
        after_register: !action.toEdit
      };
    case actionTypes.EDIT_RESULT:
      return {
        ...state,
        edit_message: {
          show: true,
          type: action.alertType,
          content: action.content,
          title: action.title
        }
      };
    default:
      return state;
  }
}
