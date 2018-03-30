import React, { Component } from 'react'
import { Form, Input } from 'antd/lib/index'

class CommentUploadForm extends Component {
  render () {
    const {getFieldDecorator} = this.props.form

    return (
      <Form>
        <Form.Item label={'邮箱'}>
          {getFieldDecorator('email', {
            initialValue: this.props.email,
            rules: [
              {
                required: true,
                message: '请输入邮箱'
              },

              {
                type: 'email',
                message: '请输入合法的邮箱地址'
              }
            ]
          })(<Input/>)}
        </Form.Item>
      </Form>
    )
  }
}

const CommentEditor = Form.create({})(CommentUploadForm)

export default CommentEditor
