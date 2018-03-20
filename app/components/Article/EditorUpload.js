import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Editor from '../../components/Forms/EditorUploadForm'
import EditorConvertToMarkdown from '../../../app/components/Normal/Editor'

import {Button, Icon} from 'antd'

class EditorUpload extends Component {
  render () {
    return (
      <div>
        <Button onClick={()=>{
          this.refs.editor.validateFields((err, values) => {
            if (!err) {
              console.log(values.title);
              let a = this.refs.richEditor.editorInstance.getHTMLContent();
              console.log(a)
            }
          })
        }}>
          <Icon type="upload" />发布文章
        </Button>
        <Editor ref={'editor'}/>
        <EditorConvertToMarkdown ref={'richEditor'}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorUpload)
