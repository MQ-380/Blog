import React, { Component } from 'react'

export default class Title extends Component {
  render () {
    let tags = []
    this.props.articleInfo.tags.some((item, i) => {
      tags.push(
        <span key={i}>
            <a
              style={{
                background: (() => (
                  '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6)
                ))()
              }}
            >
              {item}，
            </a>
          </span>
      )
      if (tags.length === 3 && this.props.articleInfo.tags > 3) {
        tags.push(<span>...</span>)
        return true
      } else {
        return false
      }
    })

    return (
      <div>
        <h2
          style={{
            fontSize: '2em',
            color: '#222',
            marginBottom: '0.2em',
            marginTop: '0.83em'
          }}
        >
          {this.props.articleInfo.articleName}
        </h2>
        <p>
          作者：
          <span style={{color: '#111'}}>{this.props.articleInfo.writer}</span>
          标签：
          {tags}
        </p>
      </div>
    )
  }
}