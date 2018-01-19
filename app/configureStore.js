import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import user from './reducers/index'
import rootSaga from './sagas/index'

const sagaMiddleware = createSagaMiddleware();
const middleware = [];


let storeEnhancers;
if(process.env.NODE_ENV === "production"){
  storeEnhancers = compose(
    applyMiddleware(...middleware, sagaMiddleware)
  )
} else {
  storeEnhancers = compose(
    applyMiddleware(...middleware, sagaMiddleware)
  )
}

export default function configureStore(initialState={}) {
  const store = createStore(user, initialState, storeEnhancers);
  sagaMiddleware.run(rootSaga);
  if(module.hot) {
    module.hot.accept('./reducers/index', ()=>{
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
      }
    )
  }
  return store;
}