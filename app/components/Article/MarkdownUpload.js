import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {action} from '../../reducers/PublishAction'
import { Form, Input, Upload, Button, Icon, message } from 'antd/lib/index'
import Tags from './TagSelect'
import {post} from '../../sagas/fetch'

class MarkdownUpload extends Component {
  render () {
    let uploadProps = {
      accept: '.md',
      name: 'md',
      action: '/api/article/markdownUpload',
      onChange: (info) => {
        if (info.file.status === 'done') {
          message.success('上传成功！请选择标签')
          this.props.set_file_name(info.file.name)
          this.props.show_tags(true)
        } else if (info.file.status === 'error') {
          message.error('上传失败！请重新上传')
        }
      },
      beforeUpload: () => {
        if(this.props.showTags) {
          message.error('一次仅能上传一个文件');
          return false;
        }
        return true;
      },
      onRemove: () => {
         return post('/article/deleteFile', {fileName: this.props.name})
           .then((res) => {
             console.log(res);
             res = JSON.parse(res)
             if(res.status) {
               this.props.show_tags(false)
               message.success('删除成功，请重新选择文件')
               return true;
             } else {
               message.error('删除失败！')
               return false;
             }
           })
           .catch(() => {
             return false;
           })
      }
    }

    return (
      <div>
        <Upload {...uploadProps}>
          <Button>
            <Icon type={'upload'}/>点击选择上传markdown文件
          </Button>
        </Upload>
        {this.props.showTags && <AfterUpload/>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    showTags: state.publish.show_tags,
    name: state.publish.file_name,
    linkNameEdit: state.publish.link_name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    show_tags: bindActionCreators(action.show_tags, dispatch),
    set_file_name: bindActionCreators(action.set_file_name, dispatch),
    set_link_name: bindActionCreators(action.set_link_name, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkdownUpload)


class AfterUploads extends Component {
  render() {
    return (
      <div>
        <Tags/>
        <UploadForm {...this.props} onChange={(changedFields)=> {this.props.set_link_name(changedFields.linkNameEdit)}}/>
        <span>{this.props.linkNameEdit.value}</span>
      </div>
    )
  }
}

const AfterUpload = connect(mapStateToProps, mapDispatchToProps)(AfterUploads)

const UploadForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      linkNameEdit: Form.createFormField({
        ...props.linkNameEdit,
      })
    };
  },
  onValuesChange(_, value) {
    console.log(value);
  }
})((props) => {
  const {getFieldDecorator} = props.form;
  return (
    <Form style={{maxWidth: 800}}>
      <Form.Item label={'请设定文章访问链接'}>
        {getFieldDecorator('linkNameEdit',{
          rules: [{required: true, message: '请输入文章的访问链接'},{max: 50, message: '最多输入50个字符'}],

        })(
          <Input addonBefore={`${window.location.origin}/articles/`} type={'text'}/>
        )}
      </Form.Item>
    </Form>
  )
})
