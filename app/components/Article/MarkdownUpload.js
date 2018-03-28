import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { action } from '../../reducers/PublishAction'
import {
  Form,
  Input,
  Upload,
  Button,
  Icon,
  message,
  Modal
} from 'antd/lib/index'
import Tags from './TagSelect'

class MarkdownUpload extends Component {
  render () {
    message.config({
      top: 100,
      duration: 2
    });

    let uploadProps = {
      accept: '.md',
      name: 'md',
      action: '/api/article/markdownUpload',
      showUploadList: false,
      onChange: info => {
        if (info.file.status === 'done') {
          message.success('上传成功！请继续完善文章信息')
          this.props.set_file_name(info.file.name)
          this.props.show_tags(true)
        } else if (info.file.status === 'error') {
          message.error('上传失败！请检查网络后请重新上传')
        }
      },
      beforeUpload: () => {
        if (this.props.showTags) {
          message.error('一次仅能上传一个文件')
          return false;
        }
        return true;
      }
    };

    return (
      <div>
        <Upload {...uploadProps}>
          <Button>
            <Icon type={'upload'}/>点击选择上传markdown文件
          </Button>
        </Upload>
        {this.props.showTags && <AfterUpload/>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showTags: state.publish.show_tags,
    name: state.publish.file_name,
    linkNameEdit: state.publish.link_name,
    articleNameEdit: state.publish.article_name,
    writer: state.global.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    show_tags: bindActionCreators(action.show_tags, dispatch),
    set_file_name: bindActionCreators(action.set_file_name, dispatch),
    set_link_name: bindActionCreators(action.set_link_name, dispatch),
    set_article_name: bindActionCreators(action.set_article_name, dispatch),
    cancel_upload: bindActionCreators(action.cancel_upload, dispatch),
    upload: bindActionCreators(action.upload_info, dispatch),
    clear_msg: bindActionCreators(action.clear_publish_msg, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarkdownUpload)

class AfterUploads extends Component {
  render() {
    return (
      <div>
        <h2>已经上传的文件名： {this.props.name}</h2>
        <UploadForm
          {...this.props}
          onChange={changedFields => {
            if (changedFields.linkNameEdit)
              this.props.set_link_name(changedFields.linkNameEdit)
            else this.props.set_article_name(changedFields.articleNameEdit)
          }}
        />

        <Tags ref={'tags'}/>

        <Button
          onClick={() => {
            this.props.upload(
              this.props.name,
              this.props.linkNameEdit.value,
              this.props.articleNameEdit.value,
              this.refs.tags.state.tags,
              this.props.writer
            )
          }}
        >
          确认发表
        </Button>
        <Button
          onClick={() => {
            Modal.confirm({
              title: '是否取消上传本篇文章？',
              content: '是否取消上传本篇文章？未提交内容将会丢失！',
              okText: '确定',
              okType: 'danger',
              cancelText: '取消',
              onOk: () => {
                this.props.clear_msg(true)
                this.props.cancel_upload(this.props.name)
              }
            })
          }}
          style={{margin: 30}}
          type={'danger'}
        >
          取消
        </Button>
      </div>
    );
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
        ...props.linkNameEdit
      }),
      articleNameEdit: Form.createFormField({
        ...props.articleNameEdit
      })
    };
  }
})(props => {
  const {getFieldDecorator} = props.form
  return (
    <Form style={{maxWidth: 800}}>
      <Form.Item label={'请输入文章标题'}>
        {getFieldDecorator('articleNameEdit', {
          rules: [
            {required: true, message: '请输入文章的标题'},
            {max: 50, message: '最多输入50个字符'}
          ]
        })(<Input type={'text'}/>)}
      </Form.Item>
      <Form.Item label={'请设定文章访问链接'}>
        {getFieldDecorator('linkNameEdit', {
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
});
