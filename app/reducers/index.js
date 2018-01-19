import {combineReducers} from 'redux'

const initialState = {
  userList: [],
}

export const actionTypes = {
  GET_ALL_USERS: "GET_ALL_USER",
  SET_MESSAGE: "SET_MESSAGE",
}

export const action = {
  get_all_users: (userList) => {
    return{
       type: actionTypes.GET_ALL_USERS,
       list: userList
    }
  }
}

export function reducer(state=initialState, action){
  switch (action.type) {
    case actionTypes.GET_ALL_USERS:
      return {
        ...state,
        userList: action.data
      }
    default:
      return state;
  }
}

export default combineReducers({
  user: reducer,
})
