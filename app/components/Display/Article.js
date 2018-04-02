import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { action as showAction } from '../../reducers/ShowAction'
import { BackTop, Button, Icon } from 'antd'

import Title from './Title'
import ArticleContent from './ArticleContent'
import Comment from './Comment'
import Header from './Header'

import '../../components/Style/Main.css'

class Article extends Component {
  render () {
    return (
      <div style={{height: '100%', width: '100%'}}>
        {
          this.props.isFetching && <div>isFetching</div>
        }
        {(!this.props.isFetching && this.props.articleResult) && (
          <div className={'article'}>
            <header className={'header'}>
              <Header/>
            </header>
            <div className={'articleDisplay'}>
              <div className={'content'}>
                <Title articleInfo={this.props.articleInfo} number={1000} isLink={false}/>
                <ArticleContent articleInfo={this.props.articleInfo} isNotFull={false}/>
                <Comment commentInfo={this.props.articleInfo.comment} articleId={this.props.articleInfo._id}/>
              </div>
              <div className={'left'}>
                <Button onClick={() => {
                  history.back()
                }} style={{
                  left: '10%',
                  position: 'fixed'
                }}><Icon type="rollback"/>返回</Button>
              </div>
              <div className={'right'}>
                <BackTop/>
              </div>
            </div>
          </div>
        )}
        {(!this.props.isFetching && !this.props.articleResult) && 404}
      </div>
    )
  }

  componentWillMount () {
    if (this.props.match.params.linkName) {
      this.props.get_article_info(`${this.props.match.params.writer}/${this.props.match.params.linkName}`)
    }
  }
}

const mapStateToProps = state => {
  return {
    articleResult: state.show.articleResult,
    articleInfo: state.show.articleDisplayInfo,
    isFetching: state.show.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    get_article_info: bindActionCreators(showAction.get_article_info, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)
