import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form , Input} from 'antd/lib/index'

class EditPasswordForm extends Component {
  state = {
    confirmDirty: false
  }


  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['checkPassword'], {force: true})
    }
    callback()
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致，请检查')
    } else {
      callback()
    }
  }

  handleConfirmBlur = (e) => {
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
    }

    return (
      <Form>
        {this.props.needOld &&
          (<Form.Item {...formItemLayout} label={'请输入旧密码'}>
            {getFieldDecorator('oldPassword', {
              rules: [{
                required: true, message: '请输入旧密码'
              }]
            })(
              <Input type={'password'}/>
            )}
          </Form.Item>)
        }
        <Form.Item {...formItemLayout} label={'输入新密码'}>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码'
            }, {
              validator: this.checkPassword
            }]
          })(
            <Input type={'password'}/>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label={'确认密码'}>
          {getFieldDecorator('checkPassword', {
            rules: [{
              required: true, message: '请确认密码'
            }, {
              validator: this.checkConfirm
            }]
          })(
            <Input type={'password'} onBlur={this.handleConfirmBlur}/>
          )}
        </Form.Item>
      </Form>
    )
  }
}


const Edit = Form.create({})(EditPasswordForm)

export default Edit
