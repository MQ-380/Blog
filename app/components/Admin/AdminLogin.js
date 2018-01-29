import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import LoginForm from './LoginForm'
import { action } from '../../reducers/index'
import { connect } from 'react-redux'

class AdminLogin extends Component {
  constructor () {
    super()
  }

  login (username, password, remember) {
    this.props.login(username, password)
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
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.global.isLogin && state.global.isAdminLogin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: bindActionCreators(action.login, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLogin)


