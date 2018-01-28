import React, { Component } from 'react'
import {Form, Icon, Input, Checkbox, Button} from 'antd'
import md5 from 'md5'

const FormItem = Form.Item;

class LoginForm extends Component {

  login = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err) {
        const {username, password, remember} = values;
        this.props.LoginInfo(username, password,remember);
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form className="login-form" onSubmit={this.login}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{required: true, message: '请输入您的用户名！'}],
          })(
            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,..25)'}}/>} placeholder='Username' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
        </FormItem>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          登录
        </Button>
      </Form>
    )
  }
}

const Login = Form.create()(LoginForm);
export default Login;