import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Preview extends Component {
  render () {
    return (
      <div>
        <li key={this.props.name}>
          <Link to={{
            pathname: '/detail',
            _id: this.props.id
          }}>
            {this.props.name}
          </Link>
        </li>
      </div>
    )
  }
}