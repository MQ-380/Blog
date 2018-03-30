import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'

export default class Editor extends React.Component {
  state = {
    htmlContent: '',
    contentFormat: 'raw',
    initialContent: ''
  };

  render() {
    let editorProps = {
      placeholder: 'Hello World!',
      contentFormat: this.props.contentFormat,
      initialContent: this.props.initialContent,
      onHTMLChange: this.handleHTMLChange,
      viewWrapper: '.demo',
      excludeControls: this.props.excludeControls,
      height: this.props.height,
      extendControls: [
        {
          type: 'button',
          text: '预览',
          className: 'preview-button',
          onClick: () => {
            window.open().document.write(this.state.htmlContent)
          }
        }
      ]
    };

    return (
      <div className="demo">
        <BraftEditor
          {...editorProps}
          ref={instance => (this.editorInstance = instance)}
        />
      </div>
    );
  }

  handleHTMLChange = htmlContent => {
    this.setState({htmlContent})
  }
}
