import React, { Component } from 'react'
import AdminPanel from './AdminPanel'
import AdminLogin from './AdminLogin'
import { connect } from 'react-redux'
import { action } from '../../reducers/AdminAction'
import { bindActionCreators } from 'redux'
import '../Style/Main.css'

class Admin extends Component {
  render () {
    return (
      <div className='full'>
        {this.props.isAdminLogin && <AdminPanel/>}
        {!this.props.isAdminLogin && (
          <div className='container'>
            <div className="form">
              <AdminLogin/>
            </div>
          </div>
        )
        }
      </div>
    )
  }

  componentWillMount () {
    if (window.sessionStorage.token) {
      this.props.check_login(window.sessionStorage.token)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isAdminLogin: state.global.isLogin && state.global.isAdminLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    check_login: bindActionCreators(action.check_login, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
