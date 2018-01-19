import React, { Component } from 'react'
import { BrowserRouter as Router, Route ,Switch} from 'react-router-dom'
import List from './List'
import Detail from './Detail'

export default class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/detail' component={Detail}/>
          <Route path='/' component={List}/>
        </Switch>
      </Router>
    )
  };
}
