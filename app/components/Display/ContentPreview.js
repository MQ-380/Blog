import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class ContentPreview extends Component {

  render () {
    return (
      <div>
        {this.props.articleInfo.fileType === 'html' && (
          <div>
            <div dangerouslySetInnerHTML={{__html: this.props.articleInfo.content}} style={{
              lineHeight: '1.8em',
              fontFamily: 'Georgia, "Cambria", serif',
            }}/>
            <a>(...更多)</a>
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ContentPreview)
