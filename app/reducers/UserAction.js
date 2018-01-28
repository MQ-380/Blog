const initialState = {
  userList: [],
  userName: ''
}

export const actionTypes = {
  GET_ALL_USERS: "GET_ALL_USERS",
  ADD_NEW_USERS: "ADD_NEW_USERS",
  GET_ALL_USERS_RES: "GET_ALL_USERS_RES",
  UPDATE_NAME: "UPDATE_NAME",
  EDIT_NAME: "EDIT_NAME",
  UPDATING_NAME: 'UPDATING_NAME',
  DELETE_ITEM: 'DELETE_ITEM'
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
  update_name: (name) => {
    return {
      type: actionTypes.UPDATE_NAME,
      name
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
  }
}

export function reducer(state=initialState, action){
  switch (action.type) {
    case actionTypes.GET_ALL_USERS_RES:
      return {
        ...state,
        userList: action.data
      }
    case actionTypes.UPDATE_NAME:
      return {
        ...state,
        userName: action.name
      }
    case actionTypes.UPDATING_NAME:
      return {
        ...state,
        editingName: action.name
      }
    default:
      return state;
  }
}
