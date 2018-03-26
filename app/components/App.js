import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Admin from './Admin/Admin'
import Home from './Display/Home'
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-okaidia.css';


export default class App extends Component {
  render () {
    return (
      <Router>
          <Switch>
            <Route path='/admin' component={Admin}/>
            <Route path='/user/:username' component={Home}/>
            <Route component={Home}/>
          </Switch>
      </Router>
    )
  };
}
