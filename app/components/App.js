import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Admin from './Admin/Admin'
import Home from './Display/Home'
import Article from './Display/Article'
import 'prismjs/components/prism-jsx'
import 'prismjs/themes/prism-okaidia.css'

export default class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path="/admin" component={Admin}/>
          <Route path="/user/:username" component={Home}/>
          <Route path="/tag/:tag" component={Home}/>
          <Route path="/article/:writer/:linkName" component={Article}/>
          <Route component={Home}/>
        </Switch>
      </Router>
    );
  }
}
