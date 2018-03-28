import React, { Component } from 'react'
import { Form, Input } from 'antd'

class RegisterForm extends Component {
  state = {
    confirmDirty: false
  };

  checkSame = (rule, value, callback) => {
    if (this.props.user.some(item => item.username === value)) {
      callback('与现有用户重名,请更换名称')
    } else {
      callback()
    }
  };

  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['checkPassword'], {force: true})
    }
    callback()
  };

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致，请检查')
    } else {
      callback()
    }
  };

  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({confirmDirty: this.state.confirmDirty || !!value})
  }

  render () {
    const {getFieldDecorator} = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16}
      }
    };

    return (
      <Form>
        <Form.Item {...formItemLayout} label={'用户名'}>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请输入用户名'
              },
              {
                validator: this.checkSame
              }
            ]
          })(<Input/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={'密码'}>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码'
              },
              {
                validator: this.checkPassword
              }
            ]
          })(<Input type={'password'}/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={'确认密码'}>
          {getFieldDecorator('checkPassword', {
            rules: [
              {
                required: true,
                message: '请确认密码'
              },
              {
                validator: this.checkConfirm
              }
            ]
          })(<Input type={'password'} onBlur={this.handleConfirmBlur}/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={'Email'}>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'email'
              },
              {
                type: 'email',
                message: '请输入合法的邮箱地址'
              }
            ]
          })(<Input/>)}
        </Form.Item>
      </Form>
    );
  }
}

const Register = Form.create({})(RegisterForm)

export default Register
