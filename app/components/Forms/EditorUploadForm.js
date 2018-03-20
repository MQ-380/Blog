import React, { Component } from 'react'
import { Form , Input} from 'antd/lib/index'
import EditorConvertToMarkdown from '../../../app/components/Normal/Editor'


class EditorUploadForm extends Component {
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

    }

    return (
      <Form>
        <Form.Item {...formItemLayout} label={'文章标题'}>
          {getFieldDecorator('title', {
            rules: [{
              required: true, message: '请输入标题'
            }]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label={'编辑文章内容'}>
          {getFieldDecorator('article')(
            <EditorConvertToMarkdown/>
          )}
        </Form.Item>
      </Form>
    )
  }
}


const Editor = Form.create({})(EditorUploadForm)

export default Editor
