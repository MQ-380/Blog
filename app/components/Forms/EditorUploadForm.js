import React, { Component } from 'react'
import { Form, Input } from 'antd/lib/index'

class EditorUploadForm extends Component {
  render () {
    const {getFieldDecorator} = this.props.form

    return (
      <Form>
        <Form.Item label={'文章标题'}>
          {getFieldDecorator('title', {
            initialValue: this.props.title,
            rules: [
              {
                required: true,
                message: '请输入标题'
              },
              {
                max: 200,
                message: '最多输入200个字符'
              }
            ]
          })(<Input/>)}
        </Form.Item>
        <Form.Item label={'文章访问链接'}>
          {getFieldDecorator('linkName', {
            initialValue: this.props.link,
            rules: [
              {required: true, message: '请输入文章的访问链接'},
              {max: 50, message: '最多输入50个字符'}
            ]
          })(
            <Input
              addonBefore={`${window.location.origin}/articles/`}
              type={'text'}
            />
          )}
        </Form.Item>
      </Form>
    );
  }
}

const Editor = Form.create({})(EditorUploadForm)

export default Editor
