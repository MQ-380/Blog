import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Profile from '../../components/Display/Profile'
import ArticlePreview from '../../components/Display/ArticlePreview'
import UserData from '../../components/Display/UserData'

import '../../components/Style/Main.css'

class UserPage extends Component {
  render () {
    let articles = []
    this.props.publishInfo.allArticles.forEach((item, i) => {
      articles.push(
        <div key={i}>
          <ArticlePreview articleInfo={item}/>
        </div>
      )
    })
    return (
      <div style={{height: '100%'}}>
        <div className={'home'}>
          <div className={'main'}>{articles}</div>
          <div className={'sliderBar'}>
            <Profile/>
            <UserData/>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
