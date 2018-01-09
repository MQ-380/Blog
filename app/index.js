import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/App.js'


let div = document.createElement('div');
div.setAttribute('id', 'app');
document.body.appendChild(div);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);