import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/App.js'
import {AppContainer} from 'react-hot-loader'


let div = document.createElement('div');
div.setAttribute('id', 'app');
document.body.appendChild(div);

if(module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app')
);