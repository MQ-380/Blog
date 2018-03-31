import React, { Component } from 'react'
import { Form, Icon, Input, Checkbox, Button } from 'antd'
import md5 from 'md5'

const FormItem = Form.Item

class LoginForm extends Component {
  login = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {username, password, remember} = values
        this.props.LoginInfo(username, md5(password), remember)
      }
    });
  };

  render () {
    const {getFieldDecorator} = this.props.form
    return (
      <Form className="login-form" onSubmit={this.login}>
        <FormItem wrapperCol={{span: 4, offset: 10}}>
          <h2>后台登录</h2>
        </FormItem>
        <FormItem wrapperCol={{span: 4, offset: 10}}>
          {getFieldDecorator('username', {
            rules: [{required: true, message: '请输入您的用户名！'}]
          })(
            <Input
              prefix={
                <Icon type="user" style={{color: 'rgba(0,0,0,..25)'}}/>
              }
              placeholder="Username"
            />
          )}
        </FormItem>
        <FormItem wrapperCol={{span: 4, offset: 10}}>
          {getFieldDecorator('password', {
            rules: [{required: true, message: 'Please input your Password!'}]
          })(
            <Input
              prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem wrapperCol={{span: 4, offset: 10}}>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
        </FormItem>
        <FormItem wrapperCol={{span: 4, offset: 10}}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const Login = Form.create()(LoginForm)
export default Login
