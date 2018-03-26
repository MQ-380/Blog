import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import App from './components/App.js'
import {AppContainer} from 'react-hot-loader'
import configureStore from './configureStore'
import 'antd/dist/antd.css';
import Admin from './components/Admin/Admin'
import Home from './components/Display/Home'

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

