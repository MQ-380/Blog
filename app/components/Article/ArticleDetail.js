import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { action as publishAction } from '../../reducers/PublishAction'
import { action as pageAction } from '../../reducers/PageAction'
import { Button, Icon, Modal, Upload,message} from 'antd'
import Editor from '../../../app/components/Normal/Editor'
import Tags from '../../../app/components/Article/TagSelect'
import EditorForm from '../../../app/components/Forms/EditorUploadForm'
import Prism from 'prismjs'

const ReactMarkdown = require('react-markdown')

class ArticleDetail extends Component {
  state = {nowArticle: {}, newFileName: ''}

  showResult = () => {
    let msg = {
      title: this.props.msg.title,
      content: this.props.msg.content,
      onOk: () => {
        this.props.clear_result_msg(this.props.msg.type !== 'error')
        this.props.get_article_content(this.state.nowArticle._id)
      }
    }
    if (this.props.msg.type === 'error') {
      Modal.error(msg)
    } else {
      Modal.info(msg)
    }
  }

  isEdited = () => (
    (this.props.content_type === 'upload' ? false :this.refs.editor.editorInstance.getContent() !== this.props.article_content) ||
        this.refs.editorForm.validateFields((err, values) => {
          if (!err) {
            return values.title !== this.state.nowArticle.articleName || values.linkName !== this.state.nowArticle.linkName
          }
        }) ||
        this.refs.tags.state.tags !== this.state.nowArticle.tags
)


  backToList = () => {
    if (this.isEdited()) {
      Modal.confirm({
        title: '返回列表将会丢失编辑的数据，请确定已经保存。',
        content: '请确定是否要返回列表。返回后将丢失未保存的修改数据',
        onOk: () => {
          this.props.clear_article_info()
          this.props.change_page('ArticleList')
        },
        okText: '确定',
        cancelText: '取消'
      })
    } else {
      this.props.clear_article_info()
      this.props.change_page('ArticleList')
    }
  }

  deleteConfirm = () => {
    Modal.confirm({
      title: '确认删除',
      content: '是否要删除本文？',
      onOk: () => {
        this.props.delete_article(this.props.article_id)
        this.props.change_page('ArticleList')
      },
      okText: '确定',
      okType: 'danger',
      cancelText: '取消'
    })
  }

  editArticle = () => {
    this.refs.editorForm.validateFields((err, values) => {
      if (err) {
        console.error(err)
      } else {
        if(this.props.content_type === 'upload') {
          this.props.edit_upload_info(values.title, this.state.newFileName, this.state.nowArticle.fileName,
            this.refs.tags.state.tags, values.linkName, this.state.nowArticle.writer, this.state.nowArticle._id);
        } else {
          this.props.edit_article(this.state.nowArticle._id, values.title, values.linkName,
            this.refs.editor.editorInstance.getHTMLContent(), this.refs.tags.state.tags);
        }
      }
    })
  }

  render () {
    message.config({
      top: 100,
      duration: 2,
    });

    let uploadProps = {
      accept: '.md',
      name: 'md',
      action: '/api/article/markdownUpload',
      showUploadList: false,
      onChange: (info) => {
        if (info.file.status === 'done') {
          message.success('文章上传成功，但是需要保存修改才会正式替换！')
          this.setState({...this.state, newFileName: info.file.name})
        } else if (info.file.status === 'error') {
          message.error('上传失败！请检查网络后请重新上传')
        }
      }
    }

    return (
      <div>
        <div style={{position: 'relative'}}>
          <Button onClick={this.backToList}>
            <Icon type="rollback"/>返回列表
          </Button>
          <div style={{position: 'absolute', right: '5%'}}>
            <Button onClick={this.editArticle}>
              保存修改
            </Button>
            <Button type={'danger'} onClick={this.deleteConfirm}>
              删除
            </Button>
          </div>
        </div>
        <br/><br/>
        <EditorForm ref={'editorForm'}
                    title={this.state.nowArticle.articleName}
                    link={this.state.nowArticle.linkName}/>
        <Tags ref={'tags'} nowTags={this.state.nowArticle.tags}/>
        {/html|md/.test(this.props.content_type) && <div>
          <Editor ref={'editor'}
                  contentFormat={'html'}
                  initialContent={this.props.article_content}/>
        </div>
        }
        {this.props.content_type === 'upload' && <div>
          <Upload {...uploadProps} >
            <Button style={{margin: '10px'}}>
              <Icon type={'upload'}/>替换现有文件
            </Button>
          </Upload>
          <p>目前文章预览：</p>
          <ArticleContent/>
        </div>}
      </div>
    )
  }

  componentDidMount () {
    let nowArticle = this.props.article_list.filter((item) => item._id === this.props.article_id)[0]
    this.setState({nowArticle, newFileName: nowArticle.fileName})
    this.props.get_article_content(nowArticle._id)
  }

  componentDidUpdate () {
    if (/html|md/.test(this.props.content_type)&& this.props.article_content !== '') {
      this.refs.editor.editorInstance.setContent(this.props.article_content)
    }
    if (this.props.msg && this.props.msg.show) {
      this.showResult()
    }
  }
}

const mapStateToProps = (state) => {
  return {
    article_id: state.page.now_article,
    article_list: state.publish.article_list,
    article_content: state.publish.article_content,
    content_type: state.publish.content_type,
    msg: state.publish.edit_article_result_message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    get_article_content: bindActionCreators(publishAction.get_article_content, dispatch),
    change_page: bindActionCreators(pageAction.change_page, dispatch),
    delete_article: bindActionCreators(publishAction.delete_article, dispatch),
    clear_article_info: bindActionCreators(publishAction.clear_article_info, dispatch),
    edit_article: bindActionCreators(publishAction.edit_article, dispatch),
    clear_result_msg: bindActionCreators(publishAction.clear_result_msg, dispatch),
    edit_upload_info: bindActionCreators(publishAction.edit_upload_info, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail)

class ArticleContentPrototype extends Component {
  render() {
    return (
      <div>
         <ReactMarkdown source={this.props.article_content}/>
      </div>
    )
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  componentDidMount() {
    Prism.highlightAll();
  }
}

let ArticleContent = connect(mapStateToProps, mapDispatchToProps)(ArticleContentPrototype);


