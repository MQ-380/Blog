import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'

export default class EditorConvertToMarkdown extends React.Component {

  state = {
    htmlContent: ''
  }

  render() {

    const editorProps = {
      placeholder: 'Hello World!',
      initialContent: '',
      onHTMLChange: this.handleHTMLChange,
      viewWrapper: '.demo',
     media: {
      allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
        image: true, // 开启图片插入功能
      video: false, // 开启视频插入功能
      audio: false, // 开启音频插入功能
      uploadFn: null, // 指定上传函数，说明见下文
      removeConfirmFn: null, // 指定删除前的确认函数，说明见下文
      onRemove: null, // 指定媒体库文件被删除时的回调，参数为被删除的媒体文件列表(数组)
      onChange: null, // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组)
      onInsert: null, // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)
    },
      // 增加自定义预览按钮
      extendControls: [
        {
          type: 'split',
        },
        {
          type: 'button',
          text: '预览',
          className: 'preview-button',
          onClick: () => {
            window.open().document.write(this.state.htmlContent)
          }
        }
      ]
    }

    return (
      <div className="demo" >
        <BraftEditor {...editorProps} style={{boarder: '1px solid rgba(0, 0, 0, 0)'}}/>
      </div>
    )

  }

  handleHTMLChange = (htmlContent) => {
    this.setState({ htmlContent })
  }

}

