import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {createLogger} from 'redux-logger'
import root from './reducers/index'
import rootSaga from './sagas/index'

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();
const middleware = [];


let storeEnhancers;
if(process.env.NODE_ENV === "production"){
  storeEnhancers = compose(
    applyMiddleware(...middleware, sagaMiddleware,loggerMiddleware)
  )
} else {
  storeEnhancers = compose(
    applyMiddleware(...middleware, sagaMiddleware,loggerMiddleware)
  )
}

export default function configureStore(initialState={}) {
  const store = createStore(root, initialState, storeEnhancers);
  sagaMiddleware.run(rootSaga);
  if(module.hot) {
    module.hot.accept('./reducers', ()=>{
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
      }
    )
  }
  return store;
}