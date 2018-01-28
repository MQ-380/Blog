import React, {Component} from 'react'
import AdminPanel from  './AdminPanel'
import AdminLogin from './AdminLogin'
import { connect } from 'react-redux'
import { action } from '../../reducers/index'
import { bindActionCreators } from 'redux'

class Admin extends Component {
  render() {
    return (
      <div>
        {window.sessionStorage.token ? this.props.check_login(window.sessionStorage.token) && <div/> : <div/>}
        {this.props.isAdminLogin && <AdminPanel/>}
        {!this.props.isAdminLogin && <AdminLogin/>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAdminLogin: state.global.isLogin && state.global.isAdminLogin
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    check_login: bindActionCreators(action.check_login,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Admin);
