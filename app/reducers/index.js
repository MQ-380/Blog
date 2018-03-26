import { reducer as UserReducer } from './UserAction'
import { reducer as PublishReducer } from './PublishAction'
import { reducer } from './AdminAction'
import { reducer as PageReducer } from './PageAction'
import {reducer as DisplayReducer} from '../reducers/DisplayAction'
import { combineReducers } from 'redux'

const root =  combineReducers({
  user: UserReducer,
  page: PageReducer,
  publish: PublishReducer,
  global: reducer,
  display: DisplayReducer,
})

export default root;