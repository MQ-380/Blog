import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {action} from '../../reducers/PublishAction'
import { Form, Input, Upload, Button, Icon, message } from 'antd/lib/index'
import MarkdownUploadForm from '../../components/Forms/MarkdownUploadForm'

class MarkdownUpload extends Component {
  render () {

    const uploadProps = {
      accept: '.md',
      name: 'md',
      action: '/api/article/markdownUpload',
      onChange (info, self=this) {
        if (info.file.status === 'done') {
          message.success('上传成功！请选择标签')
          self.props.show_tags(true)
        } else if (info.file.status === 'error') {
          message.error('上传失败！请重新上传')
        }
      }
    }

    return (
      <div>
        <Upload {...uploadProps}>
          <Button>
            <Icon type={'upload'}/>点击选择上传markdown文件.
          </Button>
        </Upload>
        {this.props.showTags && <Markd˚ownUploadForm/>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    showTags: state.publish.show_tags,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    show_tags: bindActionCreators(action.show_tags, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkdownUpload)
