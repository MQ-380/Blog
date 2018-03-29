import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { action as showAction } from '../../reducers/ShowAction'

import Title from './Title'
import ArticleContent from './ArticleContent'

import '../../components/Style/Main.css'

class Article extends Component {
  render () {
    return (
      <div style={{height: '100%', width: '100%'}}>
        {this.props.articleResult && (
          <div className={'article'}>
            <header className={'header'}>123</header>
            <div className={'articleDisplay'}>
              <div className={'content'}>
                <Title articleInfo={this.props.articleInfo} number={1000}/>
                <ArticleContent articleInfo={this.props.articleInfo} isNotFull={false}/>
              </div>
              <div className={'left'}>left</div>
              <div className={'right'}>right</div>
            </div>
          </div>
        )}
        {!this.props.articleResult && 404}
      </div>
    )
  }

  componentWillMount () {
    if (this.props.match.params.linkName) {
      this.props.get_article_info(this.props.match.params.linkName)
    }
  }
}

const mapStateToProps = state => {
  return {
    articleResult: state.show.articleResult,
    articleInfo: state.show.articleDisplayInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    get_article_info: bindActionCreators(showAction.get_article_info, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)
