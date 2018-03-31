import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Icon } from 'antd'

import Profile from '../../components/Display/Profile'
import ArticlePreview from '../../components/Display/ArticlePreview'
import UserData from '../../components/Display/UserData'
import TagInfo from '../../components/Display/TagInfo'

import '../../components/Style/Main.css'

class UserTagPage extends Component {
  render () {
    let articles = []
    this.props.publishInfo.allArticles.sort((a, b) => new Date(b.createTime) - new Date(a.createTime)).forEach((item, i) => {
      articles.push(
        <div key={i}>
          <ArticlePreview articleInfo={item}/>
        </div>
      )
    })
    return (
      <div style={{height: '100%'}}>
        <div className={'home'}>
          <div className={'main'}>
            <Button onClick={() => window.location = '/'}><Icon type="home"/>返回首页</Button>
            <h3 style={{
              color: '#aaa',
              borderBottom: '1px solid #eee',
              padding: '0.4em 0',
              fontSize: '80%',
              fontWeight: '500',
              letterSpacing: '0.1em',
              margin: '.83em 0'
            }}>{`${this.props.publishInfo.allArticles.length} ARTICLES`}</h3>
            {articles}
          </div>
          <div className={'sliderBar'}>
            {this.props.type === 'user' && <div><Profile/><UserData/></div>}
            {this.props.type === 'tag' && <div><TagInfo/></div>}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    publishInfo: state.show.userPublicInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTagPage)
