import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { action as publishAction } from '../../reducers/PublishAction'
import { action as indexAction } from '../../reducers/index'
import MarkdownUpload from '../../components/Article/MarkdownUpload'
import { Radio, Modal, Button } from 'antd'


class Publish extends Component {
  changeType = (e) => {
    if(this.props.showTags){
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
        {this.props.publish_type === 'richText' && <span>richText</span>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    publish_type: state.publish.publish_type,
    showTags: state.publish.show_tags,
    name: state.publish.file_name,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    change_type: bindActionCreators(publishAction.change_type, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Publish)


