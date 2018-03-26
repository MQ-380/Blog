import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {action as DisplayAction} from '../../reducers/DisplayAction'
import {action as IndexAction} from '../../reducers/AdminAction'
import {Button, Form, Input, Icon} from 'antd'
import { Modal } from 'antd/lib/index'

const md5 = require('md5');

class Profile extends Component {
  showMessage () {
    let msg = {
      title: this.props.msg.title,
      content: this.props.msg.content,
      onCancel() {console.log('aaa')},
      onOK() {console.log('bbb')}
    }
    if(this.props.msg.type === 'error'){
      Modal.error(msg);
    } else if(this.props.msg.type === 'success') {
      Modal.success(msg);
    }
  }


  render () {
    return (
      <div className={'profile'}>
        {
          this.props.isLogin && (
            <div>
              <h2>
                {this.props.username}
              </h2>
              <strong>
                {this.props.slogan === '' ? '未设置签名' : this.props.slogan}
              </strong>
                <div className={'link'}>
                  <Button shape="circle" icon="github" disabled={!this.props.links.github}
                          onClick={()=>window.open(this.props.links.github)}/>
                  <Button shape="circle" icon="weibo" disabled={!this.props.links.weibo}
                          onClick={()=>window.open(this.props.links.weibo)}/>
                  <Button shape="circle" icon="facebook" disabled={!this.props.links.facebook}
                          onClick={()=>window.open(this.props.links.facebook)}/>
                  <Button shape="circle" icon="twitter" disabled={!this.props.links.twitter}
                          onClick={()=>window.open(this.props.links.twitter)}/>
                </div>
            </div>
          )
        }
        {
          !this.props.isLogin && (
            <div>
              <Login ref={'loginForm'}/>
              <Button style={{marginLeft: '4.16666667%'}} onClick={() => {
                this.refs.loginForm.validateFields((err, values) => {
                  this.props.login(values.username, md5(values.password));
                })
              }}>
                登录
              </Button>
              <Button>
                注册新用户
              </Button>
            </div>
          )
        }
      </div>
    )
  }

  componentDidUpdate() {
    this.showMessage.bind(this)()
  }

  componentWillMount() {
    if (window.sessionStorage.token) {
      this.props.check_login(window.sessionStorage.token)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    msg: state.global.msg,
    username: state.global.username,
    slogan: state.global.slogan,
    links: state.global.links,
    isLogin: state.global.isLogin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: bindActionCreators(IndexAction.login, dispatch),
    check_login: bindActionCreators(IndexAction.check_login, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)


class LoginProto extends Component {
  render() {
    const {getFieldDecorator} = this.props.form
    const wrapperCol = {
      span: 16,
      offset: 1
    }
    return (
      <Form>
        <Form.Item wrapperCol={wrapperCol} style={{marginBottom: '2%', marginTop: '15%'}}>
          {getFieldDecorator('username', {
            rules: [{
              required: true, message: '请输入用户名'
            }],
          })(
            <Input prefix={<Icon type={'user'} style={{color: 'rgba(0,0,0,.25)'}}/>}
                   placeholder={'用户名'} type={'text'}/>
          )}
        </Form.Item>
        <Form.Item wrapperCol={wrapperCol} style={{marginBottom: '2%'}}>
          {getFieldDecorator('password', {
            rules: [{
             required: true, message: '请输入密码'
            }]
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                   type="password" placeholder="密码" />
          )}
        </Form.Item>
      </Form>
    )
  }
}

const Login = Form.create()(LoginProto)