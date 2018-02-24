import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { action as publishAction } from '../../reducers/PublishAction'
import { action as indexAction } from '../../reducers/index'
import MarkdownUploadForm from '../Forms/MarkdownUploadForm'
import { Radio, Form } from 'antd'

class Publish extends Component {
  changeType = (e) => {
    this.props.change_type(e.target.value)
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
        {this.props.publish_type === 'md' && <MarkdownUploadForm/>}
        {this.props.publish_type === 'richText' && <span>richText</span>}

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    publish_type: state.publish.publish_type
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    change_type: bindActionCreators(publishAction.change_type, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Publish)


