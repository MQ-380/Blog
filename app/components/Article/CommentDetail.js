import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Table} from 'antd'

class CommentDetail extends Component {
  state = {selectedRowKeys: [], articleInfo: []}

  onSelectedChange = (selectedRowKeys) => {
    selectedRowKeys = selectedRowKeys.filter((item) => this.state.articleInfo.comment.filter((e) => e.id === item).length !== 0);
    this.setState({selectedRowKeys});
  }

  columns = [
    {
      title: '评论内容',
      dataIndex: 'content'
    },
    {
      title: '审核状态',
      dataIndex: 'reviewed',
      render: (text) => {
        if(text) {
          return '已审核'
        } else {
          return  '未审核'  //给一个可以弹出框的审核
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
      render: (text) => {
        let date = text.split('T')
        return `${date[0]} ${date[1].split(',')[0]}`
      }
    }
  ]
  render () {

    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedChange,
    }
    return (
      <div>
        <h1>
          评论列表
        </h1>
        <span style={{fontSize: 'large'}}>文章标题:
          {this.state.articleInfo.articleName}
        </span>
        <Table rowSelection={rowSelection} bordered={true} columns={this.columns} dataSource={this.state.articleInfo.comment} rowKey="id"
               pagination={{
                 defaultCurrent: 1,
                 total: this.props.article_list.length,
                 pageSize: 10,
                 pageSizeOptions: ['10','20','30'],
                 showSizeChanger: true,
                 showQuickJumper: true
               }}/>

      </div>
    )
  }

  componentDidMount() {
    let nowArticle = this.props.article_list.filter((item)=>item._id === this.props.article_id)[0]
    this.setState({articleInfo: nowArticle})
  }
}

const mapStateToProps = (state) => {
  return {
    article_id: state.page.now_article,
    article_list: state.publish.article_list,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentDetail)
