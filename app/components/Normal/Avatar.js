import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Popover, Avatar, Badge} from 'antd'
import {action} from '../../reducers/index'


class Avatars extends Component {
  logout()  {
    this.props.log_out(this.props.username);
  }

  render () {
    return (
        <Popover content={
          <div>
            <a onClick={this.logout.bind(this)}>退出登录</a>
          </div>
        } title={`欢迎,${this.props.username}`} placement="bottom" trigger='click'>
          <Badge count={99}>
            <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle',cursor:'pointer' }} shape="square" size="large">
              {this.props.username}
            </Avatar>
          </Badge>
        </Popover>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.global.isAdminLogin,
    username: state.global.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    log_out: bindActionCreators(action.logout, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatars)
