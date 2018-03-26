import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import LoginForm from '../Forms/LoginForm'
import { action } from '../../reducers/AdminAction'
import { connect } from 'react-redux'
import {Modal} from 'antd'

class AdminLogin extends Component {
  login (username, password, remember) {
    this.props.login(username, password)
  }

  showMessage () {
    let msg = {
      title: this.props.msg.title,
      content: this.props.msg.content,
      onCancel() {console.log('aaa')},
      onOK() {console.log('bbb')}
    }
    if(this.props.msg.type === 'error'){
      Modal.error(msg);
    } else if(this.props.msg.type === 'success') {
      Modal.success(msg);
    }
  }

  render () {
    return (
      <div>
        <LoginForm LoginInfo={(username, password, remember) => {
          this.login(username, password, remember)
        }}/>
        {this.props.isAdmin && location.replace('/adminPanel')}
      </div>
    )
  }

  componentDidUpdate() {
    this.showMessage.bind(this)()
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.global.isLogin && state.global.isAdminLogin,
    msg: state.global.msg
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: bindActionCreators(action.login, dispatch),
    clearMsg: bindActionCreators(action.clear_msg, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLogin)


