import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Button, Input, Icon } from 'antd'
import { action as IndexAction } from '../../reducers/AdminAction'

const md5 = require('md5')

class HomePage extends Component {
  render () {
    return (
      <div style={{height: '100%'}}>
        <div className={'home'}>
          <div className={'main'}>Main</div>
          <div className={'sliderBar'}>
            <div>
              <Login ref={'loginForm'}/>
              <Button
                style={{marginLeft: '20.83333333%', width: '66.66666667%'}}
                onClick={() => {
                  this.refs.loginForm.validateFields((err, values) => {
                    this.props.login(values.username, md5(values.password))
                  })
                }}
              >
                登录
              </Button>
            </div>
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
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    login: bindActionCreators(IndexAction.login, dispatch),
    check_login: bindActionCreators(IndexAction.check_login, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)

class LoginProto extends Component {
  render () {
    const {getFieldDecorator} = this.props.form
    const wrapperCol = {
      span: 16,
      offset: 5
    }
    return (
      <Form>
        <Form.Item
          wrapperCol={wrapperCol}
          style={{marginBottom: '2%', marginTop: '15%'}}
        >
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请输入用户名'
              }
            ]
          })(
            <Input
              prefix={
                <Icon type={'user'} style={{color: 'rgba(0,0,0,.25)'}}/>
              }
              placeholder={'用户名'}
              type={'text'}
            />
          )}
        </Form.Item>
        <Form.Item wrapperCol={wrapperCol} style={{marginBottom: '2%'}}>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码'
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
              type="password"
              placeholder="密码"
            />
          )}
        </Form.Item>
      </Form>
    )
  }
}

const Login = Form.create()(LoginProto)
