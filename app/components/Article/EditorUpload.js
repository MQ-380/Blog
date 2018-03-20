import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Editor from '../../components/Forms/EditorUploadForm'
import {Button, Icon} from 'antd'

class EditorUpload extends Component {
  render () {
    return (
      <div>
        <Button>
          <Icon type="upload" />发布文章
        </Button>
        <Editor/>
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
