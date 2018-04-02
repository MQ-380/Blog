import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { action as publishAction } from '../../reducers/PublishAction'
import { action as pageAction } from '../../reducers/PageAction'
import { action as globalAction } from '../../reducers/AdminAction'
import { Table, Popconfirm, message, Button, Icon, Popover } from 'antd'

class CommentDetail extends Component {
  state = {articleInfo: [], comment: []}

  columns = [
    {
      title: '评论内容',
      dataIndex: 'content',
      render: text => {
        if (text.length > 60) {
          return (
            <div>
              {text.substring(0, 60)}
              <Popover
                title={'评论全文'}
                content={<div style={{width: '600px'}}>{text}</div>}
              >
                <a>...</a>
              </Popover>
            </div>
          );
        } else {
          return text;
        }
      }
    },
    {
      title: '审核状态',
      dataIndex: 'reviewed',
      render: (text, record) => {
        if (text) {
          return (
            <Popconfirm
              placement={'bottom'}
              title={'撤销已通过的审核？'}
              okText={'撤销'}
              cancelText={'不撤销'}
              okType={'primary'}
              onConfirm={() => {
                this.props.comment_review(
                  record.id,
                  this.props.article_id,
                  false
                );
                this.props.notice_reduce(this.props.notice + 1)
              }
              }
            >
              <a>已审核</a>
            </Popconfirm>
          );
        } else {
          return (
            <Popconfirm
              placement={'bottom'}
              title={'审核通过？'}
              okText={'通过并发布'}
              cancelText={'删除该评论'}
              okType={'primary'}
              onConfirm={() => {
                this.props.comment_review(
                  record.id,
                  this.props.article_id,
                  true
                );
                this.props.notice_reduce(this.props.notice - 1)
              }
              }
              onCancel={() => {
                this.props.comment_review(
                  record.id,
                  this.props.article_id,
                  false
                );
                this.props.notice_reduce(this.props.notice - 1)
              }
              }
            >
              <a>未审核</a>
            </Popconfirm>
          );
        }
      }
    },
    {
      title: '评论者',
      dataIndex: 'author'
    },
    {
      title: '评论时间',
      dataIndex: 'time',
      render: text => {
        let date = text.split('T')
        return `${date[0]} ${date[1].split('.')[0]}`
      }
    },
    {
      title: '文章名称',
      dataIndex: 'article',
    },
    {
      title: '操作',
      dataIndex: 'article_id',
      render: (text, record) => {
        let id = record.article_id
        return (
          <Button onClick={() =>
            this.props.change_page('commentDetail', id)
          }>前往审核</Button>
        )
      }
    }
  ];

  render () {
    return (
      <div>
        {this.props.now_page === 'commentDetail' ? (
            <div>
              <Button
                onClick={() => {
                  this.props.change_page('ArticleList')
                }}
              >
                <Icon type="rollback"/>返回文章列表
              </Button>

        <h1>评论列表</h1>
              <span style={{fontSize: 'large'}}>
          文章标题:
                {this.state.articleInfo.articleName}
        </span>
            </div>
          ) :
          (
            <h1>待审核评论列表</h1>
          )
        }
        <Table
          bordered={true}
          columns={this.props.now_page === 'commentDetail' ? this.columns.slice(0, this.columns.length - 2) : this.columns.filter(i => i.title !== '审核状态')}
          dataSource={this.props.now_page === 'commentDetail' ? this.state.articleInfo.comment : this.state.comment}
          rowKey={this.props.now_page === 'commentDetail' ? 'id' : 'showId'}
          pagination={{
            defaultCurrent: 1,
            total: this.props.now_page === 'commentDetail' ? this.props.article_list.filter(
              item => item._id === this.props.article_id
            )[0].comment.length : this.state.comment.length,
            pageSize: 10,
            pageSizeOptions: ['10', '20', '30'],
            showSizeChanger: true,
            showQuickJumper: true
          }}
        />
      </div>
    );
  }

  componentDidMount() {
    if (this.props.now_page === 'commentDetail') {
      this.setState({
        articleInfo: this.props.article_list.filter(
          item => item._id === this.props.article_id
        )[0]
      })
    } else {
      this.props.get_article_list()
      if (this.props.now_page === 'commentList') {
        let list = this.props.isAdminLogin ? this.props.article_list : this.props.article_list.filter(i => i.writer === this.props.username)
        let all = 0
        list[0].comment = list[0].comment.filter(i => !i.reviewed).map(i => {
          i.article = this.props.article_list[0].articleName
          i.article_id = this.props.article_list[0]._id
          i.showId = all
          all += 1
          return i
        })
        list.reduce((last, now) => {
          now.comment = now.comment.filter(i => !i.reviewed).map(i => {
            i.article = now.articleName
            i.article_id = now.article_id
            i.showId = all
            all += 1
            return i
          })
          now.comment.forEach(i => {
            last.comment.push(i)
          })
          return last
        })
        console.log(list[0])
        this.setState({
          comment: list[0].comment
        })
      }
    }
  }

  componentDidUpdate() {
    if (this.props.review_result.show) {
      message.error(this.props.review_result.content, 5, () => {
        this.props.clear_review_failed()
      })
    }
  }
}

const mapStateToProps = state => {
  return {
    article_id: state.page.now_article,
    article_list: state.publish.article_list,
    review_result: state.publish.review_message,
    now_page: state.page.now_page,
    isAdmin: state.global.isAdminLogin,
    username: state.global.username,
    notice: state.global.notice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    comment_review: bindActionCreators(publishAction.comment_review, dispatch),
    clear_review_failed: bindActionCreators(
      publishAction.clear_review_failed,
      dispatch
    ),
    change_page: bindActionCreators(pageAction.change_page, dispatch),
    get_article_list: bindActionCreators(publishAction.get_article_list, dispatch),
    notice_reduce: bindActionCreators(globalAction.notice_reduce, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentDetail)
