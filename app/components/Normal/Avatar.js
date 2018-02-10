import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Popover, Avatar, Badge, Popconfirm } from 'antd'
import { action } from '../../reducers/index'
import {action as userAction} from '../../reducers/UserAction'
import EditPasswordForm from '../User/EditPasswordForm'
import { Modal } from 'antd'

const md5 = require('md5')

class Avatars extends Component {
  logout () {
    this.props.log_out(this.props.username)
  }

  submit = () => {
    this.props.clear_msg();
    this.refs.form.validateFields((err, values) => {
      if (!err) {
        this.props.to_edit_password(this.props.user_id, md5(values.oldPassword),md5(values.password))
      }
    })
  }

  showResult = (self) => {
    let msg = {
      title: self.props.msg.title,
      content: self.props.msg.content,
      onOk: () => {
        self.props.to_show_edit(false);
        self.props.clear_msg();
      }
    }
    if(this.props.msg.type === 'error'){
      Modal.error(msg);
    } else {
      Modal.info(msg);
    }
  }

  render () {
    return (
      <div>
      <Modal title={'修改密码'}
             visible={this.props.show_edit_password && true}
             destroyOnClose={true}
             onOk={this.submit}
             onCancel={()=>this.props.to_show_edit(false)}
             confirmLoading={this.props.isFetching}
      >
        <EditPasswordForm needOld={true} ref={'form'}/>
      </Modal>
      <Popover content={
        <div>
          <div>
            <a onClick={()=>{this.props.to_show_edit(true)}}>修改密码</a>
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
      </div>
    )
  }

  componentDidUpdate() {
    if(this.props.msg.show) {
      this.showResult(this)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.global.isAdminLogin,
    username: state.global.username,
    show_edit_password: state.user.show_edit_password,
    user_id: state.global.user_Id,
    msg: state.user.edit_message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    log_out: bindActionCreators(action.logout, dispatch),
    to_show_edit: bindActionCreators(userAction.edit_password, dispatch),
    clear_msg: bindActionCreators(userAction.clear_msg, dispatch),
    to_edit_password: bindActionCreators(userAction.edit_user_password, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatars)
