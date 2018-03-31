import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Icon, Input, Button } from 'antd'
import { action as IndexAction } from '../../reducers/AdminAction'

const md5 = require('md5')

class ArticleHeader extends Component {
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
              <div style={{
                fontSize: '24px',
                lineHeight: 1,
                fontWeight: '600',
                float: 'right',
                margin: '7px 0 -7px',
                height: '52px'
              }}>
                <LoginForm login={(username, password) => this.props.login(username, password, false)}/>
              </div>
            )}
            {this.props.isLogin && <div style={{
              fontSize: '24px',
              lineHeight: 1,
              fontWeight: '600',
              float: 'right',
              margin: '15px 0 -15px',
              height: '52px'
            }}>欢迎登录，{this.props.username}
              <Button style={{marginLeft: '1em', height: '24px'}}
                      onClick={() => this.props.logout(this.props.username)}>注销</Button></div>}
          </div>
        </div>
      </div>
    )
  }

  componentWillMount () {
    if (window.sessionStorage.token) {
      this.props.check_login(window.sessionStorage.token)
    }
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.global.isLogin,
    username: state.global.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: bindActionCreators(IndexAction.login, dispatch),
    check_login: bindActionCreators(IndexAction.check_login, dispatch),
    logout: bindActionCreators(IndexAction.logout, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleHeader)

class LoginFormProto extends Component {

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values.username, md5(values.password))
      }
    })
  }

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
          <Button type={'primary'} htmlType={'submit'}>登录</Button>
        </Form.Item>
      </Form>
    )
  }
}

const LoginForm = Form.create()(LoginFormProto)
