const initialState = {
  userList: [],
  show_register: false,
  after_register: false
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
  REGISTER_FAILED: 'REGISTER_FAILED'
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
  delete_item: (_id) => {
    return {
      type: actionTypes.DELETE_ITEM,
      _id
    }
  },
  register_control: (show) => {
    return {
      type: actionTypes.REGISTER_CONTROL,
      show
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
    default:
      return state;
  }
}
