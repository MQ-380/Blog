import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { action as publishAction } from '../../reducers/PublishAction'
import { action as pageAction } from '../../reducers/PageAction'
import { Table, Popconfirm, message, Button, Icon, Popover } from 'antd'

class CommentDetail extends Component {
  state = {articleInfo: []}

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
              onConfirm={() =>
                this.props.comment_review(
                  record.id,
                  this.props.article_id,
                  false
                )
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
              onConfirm={() =>
                this.props.comment_review(
                  record.id,
                  this.props.article_id,
                  true
                )
              }
              onCancel={() =>
                this.props.comment_review(
                  record.id,
                  this.props.article_id,
                  false
                )
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
    }
  ];

  render () {
    return (
      <div>
        <Button
          onClick={() => {
            this.props.change_page('ArticleList')
          }}
        >
          <Icon type="rollback" />返回文章列表
        </Button>
        <h1>评论列表</h1>
        <span style={{fontSize: 'large'}}>
          文章标题:
          {this.state.articleInfo.articleName}
        </span>
        <Table
          bordered={true}
          columns={this.columns}
          dataSource={this.state.articleInfo.comment}
          rowKey="id"
          pagination={{
            defaultCurrent: 1,
            total: this.props.article_list.filter(
              item => item._id === this.props.article_id
            )[0].comment.length,
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
    this.setState({
      articleInfo: this.props.article_list.filter(
        item => item._id === this.props.article_id
      )[0]
    })
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
    review_result: state.publish.review_message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    comment_review: bindActionCreators(publishAction.comment_review, dispatch),
    clear_review_failed: bindActionCreators(
      publishAction.clear_review_failed,
      dispatch
    ),
    change_page: bindActionCreators(pageAction.change_page, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentDetail)
