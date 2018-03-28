import React, { Component } from 'react'
import Add from './AddUser'
import List from './UserList'
import Detail from './UserDetail'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { action } from '../../reducers/PageAction'

class UserManager extends Component {
  render () {
    return (
      <div>
        {this.props.page === 'user' && <List/>}
        {this.props.page === 'userDetail' && <Detail/>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    page: state.page.now_page
  };
};

const mapDispatchToProps = dispatch => {
  return {
    change_page: bindActionCreators(action.change_page, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManager)
