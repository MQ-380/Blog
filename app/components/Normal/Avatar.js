import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Popover, Avatar, Badge, Popconfirm } from 'antd'
import { action } from '../../reducers/index'
import {userAction} from '../../reducers/UserAction'
import EditPasswordForm from '../User/EditPasswordForm'

class Avatars extends Component {
  logout () {
    this.props.log_out(this.props.username)
  }

  submit = () => {
    this.props.clearMsg();
    this.refs.form.validateFields((err, values) => {
      if (!err) {
        values.password = md5(values.password)
        this.props.add_new_admin(values.username, values.password, values.email)
      }
    })
  }

  render () {
    return (
      <Popover content={
        <div>
          <div>
            <a>修改密码</a>
            <Modal title={'修改密码'}
                   visible={this.props.to_show_delete(true)}
                   destroyOnClose={true}
                   onOk={this.submit}
                   onCancel={()=>this.props.to_show_delete(false)}
                   confirmLoading={this.props.isFetching}
            >
              <EditPasswordForm needOld={true}/>
            </Modal>
          </div>
          <Popconfirm placement="bottom" title={'确定退出登录?'} onConfirm={this.logout.bind(this)} okText="确定"
                      cancelText="取消">
            <a>退出登录</a>
          </Popconfirm>
        </div>
      } title={`欢迎,${this.props.username}`} placement="bottom" trigger='click'>
        <Badge count={99}>
          <Avatar style={{backgroundColor: '#7265e6', verticalAlign: 'middle', cursor: 'pointer'}} shape="square"
                  size="large">
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
    username: state.global.username,
    show_edit_password: state.user.show_edit_password,
    user_id: state.global.userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    log_out: bindActionCreators(action.logout, dispatch),
    to_show_delete: bindActionCreators(userAction.edit_password, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatars)
