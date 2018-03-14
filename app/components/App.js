import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Admin from './Admin/Admin'
import List from './User/UserList'
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-okaidia.css';


export default class App extends Component {
  render () {
    return (
      <Router>
          <Switch>
            <Route path='/admin' component={Admin}/>
            <Route component={List}/>
          </Switch>
      </Router>
    )
  };
}
