import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { action } from '../../reducers/UserAction'
import { action as indexAction } from '../../reducers/AdminAction'
import RegisterForm from '../Forms/RegisterForm'
import { Form, Modal } from 'antd'

const md5 = require('md5')

class AddUser extends Component {
  constructor (props) {
    super(props)
  }

  showMessage = self => {
    let msg = {
      title: this.props.msg.title,
      content: this.props.msg.content,
      onOk: () => {
        self.props.to_show_register(false)
      }
    }
    if (this.props.msg.type === 'error') {
      Modal.error(msg)
    }
  }

  submit = () => {
    this.props.clearMsg();
    this.refs.form.validateFields((err, values) => {
      if (!err) {
        values.password = md5(values.password)
        this.props.add_new_user(
          values.username,
          values.password,
          values.email,
          this.props.type === 'admin'
        )
      }
    });
  };

  render () {
    return (
      <div>
        <Modal
          title={this.props.type === 'admin' ? '增加管理员' : '注册'}
          visible={this.props.show_register}
          destroyOnClose={true}
          onOk={this.submit}
          onCancel={() => this.props.to_show_register(false)}
          confirmLoading={this.props.isFetching}
        >
          <RegisterForm ref={'form'} user={this.props.type === 'admin' ? this.props.userList : this.props.userListB}/>
        </Modal>
      </div>
    );
  }

  componentDidUpdate () {
    this.showMessage(this);
  }
}

function mapStateToProps (state) {
  return {
    isFetching: state.global.isFetching,
    msg: state.global.msg,
    userList: state.user.userList,
    userListB: state.show.info.userList,
    show_register: state.user.show_register
  };
}

function mapDispatchToProps (dispatch) {
  return {
    add_new_user: bindActionCreators(action.add_new_user, dispatch),
    clearMsg: bindActionCreators(indexAction.clear_msg, dispatch),
    to_show_register: bindActionCreators(action.register_control, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser)
