import { reducer as UserReducer } from './UserAction'
import { reducer as PublishReducer } from './PublishAction'
import { reducer as GlobalReducer } from './AdminAction'
import { reducer as PageReducer } from './PageAction'
import { reducer as ShowReducer } from './ShowAction'
import { combineReducers } from 'redux'

const root = combineReducers({
  user: UserReducer,
  page: PageReducer,
  publish: PublishReducer,
  global: GlobalReducer,
  show: ShowReducer
});

export default root;
