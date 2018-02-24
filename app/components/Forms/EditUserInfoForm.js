import React, { Component } from 'react'
import { Form , Input} from 'antd/lib/index'

class EditUserInfoForm extends Component {
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
        <Form.Item {...formItemLayout} label={'电子邮件'}>
          {getFieldDecorator('newEmail', {
            rules: [{
              required: true, message: '电子邮件不得为空'
            },{
              type: 'email', message: '请输入合法的邮箱地址'
            }],
            initialValue: this.props.nowEmail
          })(
            <Input type={'text'}/>
          )}
        </Form.Item>
      </Form>
    )
  }
}


const Edit = Form.create({})(EditUserInfoForm)

export default Edit
