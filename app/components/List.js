import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {action} from '../reducers/index'
import Preview from './Preview'

class List extends Component {

  render() {
    this.props.action.get_all_users();
    return this.props.user.map((item) => {
      return(
          <Preview name={item.userName}/>
      )
    });
  }
}

List.defaultProps = {
    user: [],
    action
}


function mapStateToProps(state) {
  return {
    user: state.user.userList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    get_all_users: bindActionCreators(action.get_all_users,dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)