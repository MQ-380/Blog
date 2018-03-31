import React, { Component } from 'react'

export default class Title extends Component {
  render () {
    let tags = []
    this.props.articleInfo.tags.some((item, i) => {
      tags.push(
        <a
          key={i}
          style={{
            background: (() =>
              '#' +
              ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(
                -6
              ))(),
            padding: '0.3em 1em',
            margin: '0 0.1em',
            color: 'black'
          }}
        >
          {item}
        </a>
      );
      if (tags.length === this.props.number && this.props.articleInfo.tags > this.props.number) {
        tags.push(<a key={this.props.number + 1} href={this.props.articleInfo.linkName}>...</a>)
        return true
      } else {
        return false
      }
    });

    return (
      <div>
        {
          this.props.isLink && (
            <a
              style={{
                fontSize: '2em',
                color: '#222',
                marginBottom: '0.2em',
                marginTop: '0.83em'
              }}
              href={`/article/${this.props.articleInfo.linkName}`}
            >
              {this.props.articleInfo.articleName}
            </a>
          )
        }
        {
          !this.props.isLink &&
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
        }
        <p>
          作者：
          <span style={{color: '#111'}}>{this.props.articleInfo.writer}</span>
          {this.props.articleInfo.tags.length !== 0 && (
            <span>&nbsp;&nbsp;标签：</span>
          )
          }
          <span>{tags}</span>
          <span>
            &nbsp;&nbsp;发表日期：{(t =>
            `${t.getMonth() + 1}/${t.getDate() + 1},${t.getFullYear()}`)(
            new Date(this.props.articleInfo.createTime)
          )}
          </span>
        </p>
      </div>
    );
  }
}
