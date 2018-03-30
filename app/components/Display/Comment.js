import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, message } from 'antd'

import Editor from '../../components/Normal/Editor'
import CommentEditor from '../../components/Forms/CommentUploadForm'
import { action as showAction } from '../../reducers/ShowAction'
import draftToMarkdown from 'draftjs-to-markdown'

class Comment extends Component {
  state = {nowReplying: ''}
  render () {
    let comment = []
    this.props.commentInfo.forEach((item, i) => {
      if (item.reviewed) {
        comment.push(
          <div style={{
            borderLeft: '4px solid #4d85d1',
            marginBottom: '30px',
            paddingLeft: '10px',
            lineHeight: '2'
          }} key={i}>
            <div>
              <cite style={{
                fontWeight: 'bold',
                fontSize: 'normal'
              }}>{`# ${i + 1}`}</cite>
            </div>
            <div className={'commentWriter'}>
              <cite style={{
                fontWeight: 'bold',
                fontSize: 'normal'
              }}>发布者：{item.author}</cite>
            </div>
            <div className={'commentRef'} style={{}}>
              {
                item.refId !== '' && (
                  <div style={{
                    fontWeight: 'lighter',
                    color: '#aaa',
                    borderBottom: '0.1em dashed #aaa',
                    borderTop: '0.1em dashed #aaa'
                  }}>
                    回复 ： {`# ${parseInt(item.refId) + 1}`}
                    <br/>
                    {((t) => t.slice(0, Math.min(50, t.length)))(this.props.commentInfo[item.refId].content)}
                    ...
                  </div>
                )
              }
            </div>
            <div className={'commentBody'} style={{
              fontFamily: 'Georgia, "Cambria", serif',
              color: '#444',
              lineHeight: '1.8em'
            }} dangerouslySetInnerHTML={{__html: item.content}}/>

            <div style={{
              textAlign: 'right',
              float: 'right',
            }}>
              {((t) => `${t.split('T')[0]} ${t.split('T')[1].split('.')[0]}`)(item.time)}
            </div>

            <Button onClick={() => this.setState({nowReplying: i})}>回复</Button>
          </div>
        )
      }
    })
    return (
      <div>
        <h3 style={{
          color: '#aaa',
          borderBottom: '1px solid #eee',
          padding: '0.4em 0',
          fontSize: '80%',
          fontWeight: '500',
          letterSpacing: '0.1em',
          margin: '.83em 0'
        }}>{`${comment.length} COMMENTS`}</h3>

        <div style={{boxSizing: 'boarder-box'}}>
          {comment}
        </div>

        <div>
          <h2>发表回复</h2>
          {this.state.nowReplying !== '' &&
          <div>
            <h3>回复： {this.state.nowReplying}</h3>
            <Button onClick={() => this.setState({nowReplying: ''})}>清除</Button>
          </div>
          }
          <CommentEditor ref={'comment'} email={this.props.nowUserEmail}/>
          <div style={{
            borderStyle: 'solid',
            marginBottom: '2em'
          }}>
            <Editor
              ref={'editor'}
              contentFormat={'html'}
              initialContent={''}
              excludeControls={['media', 'font-size', 'font-family', 'line-height', 'letter-spacing',
                'indent', 'text-color', 'bold', 'italic', 'underline', 'strike-through',
                'superscript', 'subscript', 'remove-styles', 'emoji', 'text-align', 'split', 'headings', 'list_ul',
                'list_ol', 'blockquote', 'split', 'link', 'split', 'hr', 'split', 'media', 'clear']}
              height={300}
            />
          </div>
          <Button onClick={() => {
            this.refs.comment.validateFields((err, values) => {
              if (!err) {
                this.props.upload_comment({
                  id: this.props.commentInfo.length + 1,
                  articleId: this.props.articleId,
                  content: this.refs.editor.editorInstance.getHTMLContent(),
                  author: values.email,
                  refId: this.state.nowReplying,
                })
              }
            })
          }}>发表评论</Button>
        </div>
      </div>
    )
  }

  componentDidUpdate () {
    const onClose = () => {
      this.props.close_result_message()
    }
    if (this.props.publishCommentResult.isPublished) {
      message.config({
        top: 200,
        duration: 2,
      })
      this.props.publishCommentResult.publishResult ?
        message.success('评论成功，等待作者审核中。', 5, onClose) :
        message.error('评论失败，请检查网络。', 5, onClose)
    }
  }
}

const mapStateToProps = state => {
  return {
    nowUserEmail: state.global.isLogin ? state.global.email : '',
    publishCommentResult: state.show.publish_comment_result,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    upload_comment: bindActionCreators(showAction.upload_comment, dispatch),
    close_result_message: bindActionCreators(showAction.close_result_message, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
