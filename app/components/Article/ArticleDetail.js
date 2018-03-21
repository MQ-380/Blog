import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {action as publishAction} from '../../reducers/PublishAction'
import {action as pageAction} from '../../reducers/PageAction'
import {Button, Icon, Modal} from 'antd'
import Editor from '../../../app/components/Normal/Editor'
import Prism from 'prismjs';

const ReactMarkdown = require('react-markdown')

class ArticleDetail extends Component {
  state = {nowArticle: {}}

  render () {
    return (
      <div>
        <Button onClick={()=> {
          if (this.refs.editor.editorInstance.getContent() !== this.props.article_content) {
            Modal.confirm({
              title: '返回列表将会丢失编辑的数据，请确定已经保存。',
              content: '请确定是否要返回列表。返回后将丢失未保存的修改数据',
              onOk: () => {
                this.props.clear_article_info();
                this.props.change_page('ArticleList');
              },
              okText: '确定',
              cancelText: '取消'
            })
          } else {
            this.props.clear_article_info();
            this.props.change_page('ArticleList')
          }
        }
        }>
          <Icon type="rollback" />返回列表
        </Button>
        <h1>
        {`标题：${this.state.nowArticle.articleName}`}
        </h1>
        <div style={{position: 'relative'}}>
          <div style={{position: 'absolute'}}>
            <span style={{fontSize: 'large'}}>文章阅读链接:
              <a>
                {`${window.location.origin}/article/${this.state.nowArticle.linkName}`}
              </a>
            </span>
          </div>
          <div style={{position: 'absolute', right: '5%'}}>
            <Button onClick={()=>{

            }}>
              保存修改
            </Button>
            <Button type={'danger'} onClick={
              () => {
                console.log('dede')
                Modal.confirm({
                  title: '确认删除',
                  content: '是否要删除本文？',
                  onOk: () => {
                    this.props.delete_article(this.props.article_id);
                    this.props.change_page('ArticleList');
                  },
                  okText: '确定',
                  okType: 'danger',
                  cancelText: '取消'
                })
              }
            }>
              删除
            </Button>
          </div>
        </div>
        <br/><br/>
        <Editor ref={'editor'}
                contentFormat={'html'}
                initialContent={this.props.article_content}/>
      </div>
    )
  }

  componentDidMount() {
    let nowArticle = this.props.article_list.filter((item)=>item._id === this.props.article_id)[0]
    this.setState({nowArticle})
    console.log(nowArticle);
    this.props.get_article_content(nowArticle._id)
  }

  componentDidUpdate() {
    if(this.props.article_content !== '') {
      this.refs.editor.editorInstance.setContent(this.props.article_content);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    article_id: state.page.now_article,
    article_list: state.publish.article_list,
    article_content: state.publish.article_content,
    content_type: state.publish.content_type
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    get_article_content: bindActionCreators(publishAction.get_article_content, dispatch),
    change_page: bindActionCreators(pageAction.change_page, dispatch),
    delete_article: bindActionCreators(publishAction.delete_article, dispatch),
    clear_article_info: bindActionCreators(publishAction.clear_article_info, dispatch)
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


