import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { action as publishAction } from '../../reducers/PublishAction'
import { action as pageAction } from '../../reducers/PageAction'
import MarkdownUpload from '../../components/Article/MarkdownUpload'
import { Radio, Modal, Button, Table, Icon, Tooltip } from 'antd'


class ArticleList extends Component {

  state = {selectedRowKeys: [], visible: false, selectedRowNames: []}

  onSelectedChange = (selectedRowKeys) => {
    selectedRowKeys = selectedRowKeys.filter((item) => this.props.article_list.filter((e) => e._id === item).length !== 0);
    this.setState({selectedRowKeys});
    console.log(selectedRowKeys);
  }

  showMessage = (self) => {
    let msg = {
      title: this.props.delete_message.title,
      content: this.props.delete_message.content,
      onOk: () => {
        self.props.show_delete_confirm(false);
        self.props.clear_delete_message();
      }
    }
    if(this.props.delete_message.type === 'error'){
      Modal.error(msg);
    } else {
      Modal.success(msg);
    }
  }

  columns = [
    {
      title: '文章标题',
      key: '_id',
      dataIndex: 'articleName',
      render: (text, record) => (
        <Tooltip placement='bottom' title='点击查看详情' mouseEnterDelay={2}>
          <a onClick={(e)=>{
            e.preventDefault();
            this.props.change_page('articleDetail', record._id);
          }}>
            {text}
          </a>
        </Tooltip>
      )
    },
    {
      title: '作者',
      dataIndex: 'writer',
      sorter: (a,b) => a.writer > b.writer,
    },
    {
      title: '修改时间',
      dataIndex: 'editTime',
      sorter: (a,b) => a.editTime > b.editTime,
    },
    {
      title: '评论数',
      dataIndex: 'comment',
      render: (_, record) => (
        <Tooltip placement='bottom' title='点击查看详情' mouseEnterDelay={2}>
          <a onClick={(e)=>{
            e.preventDefault();
            /*完成跳转*/
          }}>
            {record.comment.length}
          </a>
        </Tooltip>
      )
    },
    {
      title: '点赞数',
      dataIndex: 'likeNumber',
      sorter: (a,b) => a.likeNumber > b.likeNumber,
    },
    {
      title: '浏览量',
      dataIndex: 'readNumber',
      sorter: (a,b) => a.readNumber > b.readNumber,
    },
    {
      title: '文章标签',
      dataIndex: 'tags',
      render: (_,record) => (
        <span>{record.tags.join(',')}</span>
      )
    },
  ]

  render () {
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedChange,
    }

    return (
      <div>
        <h1>文章列表</h1>
        <div style={{position: 'relative'}}>
          <div style={{position: 'absolute', right: '5%'}}>
              <Button type="danger" onClick={()=>{
                let selectedRowNames = this.state.selectedRowKeys.map((id) => {
                  return this.props.article_list.filter((item) => item._id === id)[0].articleName;
                })
                this.setState({selectedRowNames})
                this.props.show_delete_confirm(true)
              }}>
                删除
              </Button>
          </div>
        </div>
        <br/><br/>
        <Table rowSelection={rowSelection} bordered={false} columns={this.columns} dataSource={this.props.article_list} rowKey="_id"
               pagination={{
                 defaultCurrent: 1,
                 total: this.props.article_list.length,
                 pageSize: 10,
                 pageSizeOptions: ['10','20','30'],
                 showSizeChanger: true,
                 showQuickJumper: true
               }}/>
        <Modal title={`确定删除如下${this.state.selectedRowNames.length}篇文章?`}
               visible={this.props.show_delete}
               onOk = {()=>{this.props.delete_article(this.state.selectedRowKeys);}}
               okType ={'danger'}
               onCancel={()=>this.props.show_delete_confirm(false)}
               confirmLoading={!this.props.show_delete}
        >
          <p>{this.state.selectedRowNames.join(',')}</p>
          <p>删除后，将无法恢复！</p>
        </Modal>
      </div>
    )
  }


  componentDidMount() {
    this.props.get_article_list();
  }

  componentDidUpdate() {
    if(this.props.after_delete) {
      this.props.get_article_list();
    }
    if(this.props.delete_message.show) {
      this.showMessage(this)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    article_list: state.publish.article_list,
    show_delete: state.publish.show_delete,
    after_delete: state.publish.after_delete,
    delete_message: state.publish.delete_message,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    get_article_list: bindActionCreators(publishAction.get_article_list, dispatch),
    show_delete_confirm: bindActionCreators(publishAction.show_article_delete_confirm, dispatch),
    delete_article: bindActionCreators(publishAction.delete_article, dispatch),
    clear_delete_message: bindActionCreators(publishAction.clear_delete_message, dispatch),
    change_page: bindActionCreators(pageAction.change_page, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)


