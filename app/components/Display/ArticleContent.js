import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Prism from 'prismjs'

const ReactMarkdown = require('react-markdown')

class ArticleContent extends Component {

  render () {
    return (
      <div style={{
        marginBottom: this.props.isNotFull ? '3em' : 0
      }}>
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

  componentDidUpdate () {
    Prism.highlightAll()
  }

  componentDidMount () {
    Prism.highlightAll()
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContent)
