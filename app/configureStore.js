import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {createLogger} from 'redux-logger'
import createSocketMiddleware from '../app/socketMiddleware'
import root from './reducers/index'
import rootSaga from './sagas/index'

const io = require('socket.io-client');
const socket = io('http://localhost:3030');

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();
const socketMiddleware = createSocketMiddleware(socket);
const middleware = [];

let storeEnhancers;
if(process.env.NODE_ENV === "production"){
  storeEnhancers = compose(
    applyMiddleware(...middleware, socketMiddleware, sagaMiddleware, loggerMiddleware)
  )
} else {
  storeEnhancers = compose(
    applyMiddleware(...middleware, socketMiddleware, sagaMiddleware, loggerMiddleware)
  )
}

export default function configureStore(initialState={}) {
  const store = createStore(root, initialState, storeEnhancers);
  sagaMiddleware.run(rootSaga);
  if(module.hot) {
    module.hot.accept('./reducers', ()=>{
      const nextRootReducer = require('./reducers/AdminAction');
      store.replaceReducer(nextRootReducer);
      }
    )
  }
  return store;
}