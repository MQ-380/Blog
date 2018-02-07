import React, { Component } from 'react'
import Add from '../User/AddUser'
import List from '../User/UserList'
import Detail from '../User/UserDetail'
import Edit from '../User/EditUser'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export default  class UserManager  extends Component {
  render () {
    return (
      <div>
        <Router>
          <Switch>
            <Route path='/admin/detail' component={Detail}/>
            <Route path='/admin/edit' component={Edit}/>
            <Route path='/admin/add' component={Add}/>
            <Route path='/admin' component={List}/>
          </Switch>
        </Router>
      </div>
    )
  }
}