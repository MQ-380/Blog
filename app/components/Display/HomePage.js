import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { action as showAction } from '../../reducers/ShowAction'
import Header from '../../components/Display/Header'
import ArticlePreview from '../../components/Display/ArticlePreview'

import '../../components/Style/Main.css'
import { action } from '../../reducers/UserAction'

class HomePage extends Component {
  render () {
    let writer = []
    this.props.info.writers.forEach((item, i) => {
      writer.push(<li key={i}><a href={`/user/${item}`}>{item}</a></li>)
    })

    let articles = []
    this.props.info.articles.sort((a, b) => new Date(b.createTime) - new Date(a.createTime)).forEach((item, i) => {
      articles.push(
        <div key={i}>
          <ArticlePreview articleInfo={item}/>
        </div>
      )
    })

    let catalogs = []
    this.props.info.tags
      .sort((a, b) => b.aId.length - a.aId.length)
      .forEach((item, i) => {
        catalogs.push(
          <li key={i}>
            <a href={`/tag/${item.tags}`}>
              {item.tags}
            </a>
            （{item.aId.length}）
          </li>
        )
      })

    return (
      <div style={{height: '100%', width: '100%'}}>
        <div className={'article'}>
          <header className={'header'}>
            <Header/>
          </header>
          <div className={'articleDisplay'}>
            <div className={'homeContent'}>
              {articles}
            </div>
            <div className={'right'} style={{padding: '3em'}}>
              <h3
                style={{
                  color: 'black',
                  fontSize: '1.5em',
                  marginBottom: '0em'
                }}
              >
                作者：
              </h3>
              {writer}
              <div style={{marginTop: '3em'}}>
                <h3
                  style={{
                    color: 'black',
                    fontSize: '1.5em',
                    marginBottom: '0em'
                  }}
                >
                  标签：
                </h3>
                {catalogs}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentWillMount () {
    this.props.get_info()
  }
}

const mapStateToProps = state => {
  return {
    info: state.show.info
  }
}

const mapDispatchToProps = dispatch => {
  return {
    get_info: bindActionCreators(showAction.get_info, dispatch),
    show_register: bindActionCreators(action.register_control, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)

