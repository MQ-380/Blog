import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Preview extends Component {
  render () {
    return (
      <div>
        <li key={this.props.name}>
          <Link to={{
            pathname: '/detail',
            name: this.props.name
          }}>
            {this.props.name}
          </Link>
        </li>
      </div>
    )
  }
}