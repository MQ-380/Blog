import React, { Component } from 'react'
import Add from '../User/AddUser'
import List from '../User/UserList'
import Detail from '../User/UserDetail'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { action } from '../../reducers'


class UserManager  extends Component {
  render () {
    return (
      <div>
        {this.props.page === 'user' &&<List/>}
        {this.props.page === 'userDetail' && <Detail/>}
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    page: state.global.page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    change_page: bindActionCreators(action.change_page, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManager)


