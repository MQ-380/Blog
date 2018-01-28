import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Admin from './Admin/Admin'
import List from './User/UserList'

export default class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Switch>
            <Route path='/admin' component={Admin}/>
            <Route component={List}/>
          </Switch>
        </div>
      </Router>
    )
  };
}

