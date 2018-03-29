import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Title from '../../components/Display/Title'
import Content from './ArticleContent'

class ArticlePreview extends Component {

  render () {
    return (
      <div>
        <Title articleInfo={this.props.articleInfo} number={3}/>
        <Content articleInfo={this.props.articleInfo} isNotFull={true}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePreview)
