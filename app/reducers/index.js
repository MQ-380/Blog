import {combineReducers} from 'redux'
import {reducer as UserReducer} from '../reducers/UserAction'

const initialState = {
  isFetching: false,
  msg: {
    type: 1,//0失败 1成功
    content: ''
  }
};

export const actionTypes = {
  SET_MESSAGE: "SET_MESSAGE",
  FETCH_START: "FETCH_START",
  FETCH_END: "FETCH_END"
}

export function reducer(state=initialState, action){
  switch (action.type) {
    case actionTypes.FETCH_START:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.FETCH_END:
      return {
        ...state,
        isFetching: false
      }
    case actionTypes.SET_MESSAGE:
      return {
        ...state,
        isFetching: false,
        msg: {
          type: action.msgType,
          content: action.msgContent
        }
      };
    default:
      return state;
  }
}

const root =  combineReducers({
  user: UserReducer,
  global:reducer
})

export default root;