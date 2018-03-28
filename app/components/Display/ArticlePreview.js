import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Title from '../../components/Display/Title'

class ArticlePreview extends Component {

  render () {
    return (
      <div>
        <Title articleInfo={this.props.articleInfo}/>

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
