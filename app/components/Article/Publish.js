import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { action as publishAction } from '../../reducers/PublishAction'
import { action as indexAction } from '../../reducers/AdminAction'
import MarkdownUpload from '../../components/Article/MarkdownUpload'
import { Radio, Modal, Button } from 'antd'
import Editor from '../../components/Article/EditorUpload'


class Publish extends Component {
  showResult = (self) => {
    let msg = {
      title: self.props.msg.title,
      content: self.props.msg.content,
      onOk: () => {
        self.props.clear_msg(this.props.msg.type !== 'error');
      }
    }
    if(this.props.msg.type === 'error'){
      Modal.error(msg);
    } else {
      Modal.info(msg);
    }
  }

  changeType = (e) => {
    if(this.props.showTags || this.props.publish_type === 'richText'){
      Modal.confirm({
        title: '是否要转换编辑方式？',
        content: '是否要转换编辑方式？未提交内容将会丢失！',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: ()=>{
          this.props.change_type(e.target.value)
        }
      });
    } else {
      this.props.change_type(e.target.value)
    }
  }

  render () {
    return (
      <div>
        <h1>发表文章</h1>
        <label>
          选择文章编写方式&nbsp;&nbsp;
          <span>
          <Radio.Group onChange={this.changeType} value={this.props.publish_type} >
            <Radio value={'md'}>上传md文件</Radio>
            <Radio value={'richText'}>在线编写</Radio>
          </Radio.Group>
          </span>
        </label>
        {this.props.publish_type === 'md' && <MarkdownUpload/>}
        {this.props.publish_type === 'richText' && <Editor/>}
      </div>
    )
  }

  componentDidUpdate() {
    if(this.props.msg.show) this.showResult(this)
  }
}

const mapStateToProps = (state) => {
  return {
    publish_type: state.publish.publish_type,
    showTags: state.publish.show_tags,
    name: state.publish.file_name,
    msg: state.publish.upload_message,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    change_type: bindActionCreators(publishAction.change_type, dispatch),
    clear_msg: bindActionCreators(publishAction.clear_publish_msg, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Publish)


