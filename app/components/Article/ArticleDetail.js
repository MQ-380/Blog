import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {action as publishAction} from '../../reducers/PublishAction'
import {Button} from 'antd'

const ReactMarkdown = require('react-markdown')

class ArticleDetail extends Component {
  state = {nowArticle: {}}

  render () {
    return (
      <div>
        <h1>
        {this.state.nowArticle.articleName}
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
            <Button onClick={()=>this.props.change_article_show_style('edit')}>
              编辑文章
            </Button>
            <Button type={'danger'}>
              删除
            </Button>
          </div>
        </div>
        <br/><br/>
        {this.props.now_style === 'plain' && <ArticleContent style={{overflow: 'scroll', }}/>}
      </div>
    )
  }

  componentDidMount() {
    let nowArticle = this.props.article_list.filter((item)=>item._id === this.props.article_id)[0]
    this.setState({nowArticle})
    this.props.get_article_content(nowArticle._id)

  }
}

const mapStateToProps = (state) => {
  return {
    article_id: state.page.now_article,
    article_list: state.publish.article_list,
    now_style: state.publish.article_show_style,
    article_content: state.publish.article_content
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    change_article_show_style: bindActionCreators(publishAction.change_article_show_style, dispatch),
    get_article_content: bindActionCreators(publishAction.get_article_content, dispatch)
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
}

let ArticleContent = connect(mapStateToProps, mapDispatchToProps)(ArticleContentPrototype);


