import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class UserData extends Component {
  render () {
    let catalogs = []
    this.props.publicInfo.articleTags
      .sort((a, b) => b.aId.length - a.aId.length)
      .some((item, i) => {
        catalogs.push(
          <div key={i}>
            <a
              style={{
                color: '#b0cadb',
                fontSize: '20px'
              }}
            >
              {item.tags}
            </a>
            （{item.aId.length}）
          </div>
        )
        if (catalogs.length === 4 && this.props.publicInfo.articleInfo > 4) {
          catalogs.push(
            <div key={i + 1}>
              <a
                style={{
                  color: '#b0cadb',
                  fontSize: '20px'
                }}
              >
                更多...
              </a>
            </div>
          )
          return true
        } else {
          return false
        }
      })

    return (
      <div
        style={{
          margin: '5em 2em 0'
        }}
      >
        <h1
          style={{
            fontSize: '1.2em',
            color: '#40a9ff',
            fontWeight: '300'
          }}
        >
          {`该作者的文章数:${this.props.publicInfo.allArticles.length}`}
        </h1>

        <div
          style={{
            color: '#fff',
            fontWeight: 'lighter',
            fontSize: '20px',
            fontFamily: 'sans-serif'
          }}
        >
          <h3
            style={{
              fontSize: '25px',
              fontWeight: 'bold',
              margin: '2em 0 0.5em 0',
              color: '#fff'
            }}
          >
            CATALOG
          </h3>
          <div
            style={{
              lineHeight: 2
            }}
          >
            {catalogs}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    publicInfo: state.show.userPublicInfo
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(UserData)
