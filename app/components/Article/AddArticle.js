import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { action } from '../../reducers/UserAction'
import { action as indexAction } from '../../reducers/index'
import { Form, Modal } from 'antd'

export default class AddArticle extends Component {
  render () {
    return (
      <div>
        <h1>发表文章</h1>

      </div>
    )
  }
}



