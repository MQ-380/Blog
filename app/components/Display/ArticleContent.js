import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const ReactMarkdown = require('react-markdown')

class ArticleContent extends Component {

  render () {
    return (
      <div>
        {this.props.articleInfo.fileType === 'html' && (
          <div>
            <div dangerouslySetInnerHTML={{__html: this.props.articleInfo.content}} style={{
              lineHeight: '1.8em',
              fontFamily: 'Georgia, "Cambria", serif',
            }}/>
          </div>
        )}
        {
          this.props.articleInfo.fileType !== 'html' && (
            <ReactMarkdown source={this.props.articleInfo.content}/>
          )
        }
        {this.props.isNotFull &&
        <a>(...更多)</a>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContent)
