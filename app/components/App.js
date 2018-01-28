import React, { Component } from 'react'
import { BrowserRouter as Router, Route ,Switch} from 'react-router-dom'
import Detail from './Detail'
import List from './List'
import Add from './Add'
import Edit from './Edit'

export default class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/detail' component={Detail}/>
          <Route path='/edit' component={Edit}/>
          <Route path='/add' component={Add} />
          <Route path='/' component={List}/>
        </Switch>
      </Router>
    )
  };
}

