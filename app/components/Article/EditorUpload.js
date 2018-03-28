import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import draftToMarkdown from 'draftjs-to-markdown'
import { action as publishAction } from '../../reducers/PublishAction'
import EditorForm from '../../components/Forms/EditorUploadForm'
import Editor from '../../../app/components/Normal/Editor'
import Tags from '../../../app/components/Article/TagSelect'
import { Button, Icon } from 'antd'

class EditorUpload extends Component {
  handleSubmit = type => {
    this.refs.editor.validateFields((err, values) => {
      if (!err) {
        let content = this.refs.richEditor.editorInstance;
        if (type === 'md') {
          content = draftToMarkdown(content.getContent());
        } else {
          content = content.getHTMLContent();
        }
        this.props.publish_article(
          values.title,
          content,
          type,
          this.refs.tags.state.tags,
          this.props.writer,
          values.linkName
        )
      }
    });
  };

  render () {
    return (
      <div>
        <Button
          onClick={() => {
            this.handleSubmit('html')
          }}
        >
          <Icon type="upload" />文章发布
        </Button>
        <Button
          onClick={() => {
            this.handleSubmit('md')
          }}
        >
          <Icon type="cloud-upload-o" />markdown发布
        </Button>
        <p>
          <b>
            注意：若要根据编辑器内格式请使用文章发布，使用markdown发布字体、字号、间距等设定将失效。
          </b>
        </p>
        <EditorForm ref={'editor'}/>
        <Tags ref={'tags'}/>
        <Editor ref={'richEditor'} contentFormat={'raw'} initialContent={''}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    writer: state.global.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    publish_article: bindActionCreators(publishAction.upload_article, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorUpload)
