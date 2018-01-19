import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import App from './components/App.js'
import Detail from './components/Detail'
import {AppContainer} from 'react-hot-loader'
import configureStore from './configureStore'
import history from 'history/'

let div = document.createElement('div');
div.setAttribute('id', 'app');
document.body.appendChild(div);

if(module.hot) {
  module.hot.accept();
}

const store = configureStore();

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('app')
);