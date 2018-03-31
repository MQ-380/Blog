import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Icon, Input, Button } from 'antd'
import { action as IndexAction } from '../../reducers/AdminAction'
import { action as UserAction } from '../../reducers/UserAction'

import Add from '../../components/User/AddUser'
import { message } from 'antd'

const md5 = require('md5')

class Header extends Component {
  render () {
    return (
      <div>
        <div
          style={{
            padding: '0 100px',
            margin: '0 auto',
            zIndex: 2
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              lineHeight: 1,
              fontWeight: '600',
              float: 'left',
              margin: '15px 0 -15px',
              height: '52px'
            }}
          >
            BLOG
          </h2>
          <div>
            {!this.props.isLogin && (
              <div
                style={{
                  fontSize: '24px',
                  lineHeight: 1,
                  fontWeight: '600',
                  float: 'right',
                  margin: '7px 0 -7px',
                  height: '52px'
                }}
              >
                <LoginForm
                  login={(username, password) =>
                    this.props.login(username, password, false)
                  }
                  register={() => this.props.show_register(true)}
                />
              </div>
            )}
            {this.props.isLogin && (
              <div
                style={{
                  fontSize: '24px',
                  lineHeight: 1,
                  fontWeight: '600',
                  float: 'right',
                  margin: '15px 0 -15px',
                  height: '52px'
                }}
              >
                欢迎登录，{this.props.username}
                <Button
                  style={{marginLeft: '1em', height: '24px'}}
                  onClick={() => this.props.logout(this.props.username)}
                >
                  <Icon type="poweroff"/>注销
                </Button>
                <Button
                  style={{marginLeft: '1em', height: '24px'}}
                  onClick={() => (window.location = '/admin')}
                >
                  <Icon type="setting"/>后台管理
                </Button>
              </div>
            )}
          </div>
        </div>
        <Add type={'user'}/>
      </div>
    );
  }

  componentWillMount () {
    if (window.sessionStorage.token) {
      this.props.check_login(window.sessionStorage.token)
    }
  }

  componentDidUpdate () {
    if (this.props.registerResult) {
      message.config({
        top: 52
      })
      message.success('注册成功', 5, () => {this.props.register_close()})
    }
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.global.isLogin,
    username: state.global.username,
    registerResult: state.user.register_result,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: bindActionCreators(IndexAction.login, dispatch),
    check_login: bindActionCreators(IndexAction.check_login, dispatch),
    logout: bindActionCreators(IndexAction.logout, dispatch),
    show_register: bindActionCreators(UserAction.register_control, dispatch),
    register_close: bindActionCreators(UserAction.register_close, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)

class LoginFormProto extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values.username, md5(values.password))
      }
    });
  };

  render () {
    const {getFieldDecorator} = this.props.form
    return (
      <Form layout={'inline'} onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{required: true, message: '请输入用户名'}]
          })(
            <Input
              prefix={
                <Icon type={'user'} style={{color: 'rgba(0,0,0,.25)'}}/>
              }
              placeholder="用户名"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{required: true, message: '请输入密码'}]
          })(
            <Input
              prefix={
                <Icon type={'lock'} style={{color: 'rgba(0,0,0,.25)'}}/>
              }
              type={'password'}
              placeholder="密码"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type={'primary'} htmlType={'submit'}>
            登录
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={() => this.props.register()}>注册</Button>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = Form.create()(LoginFormProto)
