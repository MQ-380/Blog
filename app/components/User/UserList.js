import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {action} from '../../reducers/UserAction'
import {action as indexAction} from '../../reducers/index'
import {Button, Table, Divider, Tooltip, Menu, Icon, Dropdown,Form, Modal} from 'antd'
import Add from './AddUser'



class List extends Component {
  state = {selectedRowKeys: [], visible: false, selectedRowNames: []}

  onSelectedChange = (selectedRowKeys) => {
    selectedRowKeys = selectedRowKeys.filter((item) => this.props.user.filter((e) => e._id === item).length !== 0);
    this.setState({selectedRowKeys});
    console.log(selectedRowKeys);
  }

  columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: '_id',
      render: (text,record) => (
        <Tooltip placement='bottom' title='点击查看详情' mouseEnterDelay={2}>
          <a onClick={(e)=>{
            e.preventDefault();
            this.props.change_page('userDetail')
          }}>
            {text}
          </a>
        </Tooltip>
      )
    },
    {
      title: '用户权限',
      dataIndex: 'auth',
      render: (text) => {
        text = text === 'admin' ? '管理员' : '一般用户';
        return(
          <span>{text}</span>
        )
      }
    },
    {
      title: '用户邮箱',
      dataIndex: 'email'
    }
  ]

  handleAction = (e) => {
    switch (e.key) {
      case 'fresh':
        return this.props.get_all_users();
      case 'add':
        return this.props.show_register(true);
      case 'delete':
        if(this.state.selectedRowKeys.length === 0) {
          Modal.error({title: '错误', content:'未选择要删除的账号!'})
        } else {
          let selectedRowNames = this.state.selectedRowKeys.map((id) => {
            return this.props.user.filter((item) => item._id === id)[0].username;
          })
          this.setState({selectedRowNames})
          if (selectedRowNames.includes(this.props.username)) {
            Modal.error({title: '错误', content: '不得删除当前登录的账号!'})
          } else {
            return this.props.to_show_delete(true);
          }
        }
    }
  }

  showMessage = (self) => {
    let msg = {
      title: this.props.delete_msg.title,
      content: this.props.delete_msg.content,
      onOk: () => {
        self.props.to_show_delete(false);
        self.props.close_msg();
      }
    }
    if(this.props.delete_msg.type === 'error'){
      Modal.error(msg);
    }
  }


  actions = (
    <Menu onClick={this.handleAction}>
      <Menu.Item key={'fresh'}><span><Icon type={'reload'}/>刷新</span></Menu.Item>
      <Menu.Item key={'add'}><span><Icon type={'plus'}/>增加管理员</span></Menu.Item>
      <Menu.Item key={'delete'}><span><Icon type={'minus'}/>删除所选用户</span></Menu.Item>
    </Menu>
  )

  render() {
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedChange,
    }

    return (
      <div>
        <h1>用户管理</h1>
        <div style={{position: 'relative'}}>
          <div style={{position: 'absolute', right: '5%'}}>
            <Dropdown overlay={this.actions}>
              <Button >
                用户操作<Icon type={'down'}/>
              </Button>
            </Dropdown>
          </div>
        </div>
          <br/><br/>
          <Table rowSelection={rowSelection} bordered={true} columns={this.columns} dataSource={this.props.user} rowKey="_id"
                 pagination={{
                   defaultCurrent: 1,
                   total: this.props.user.length,
                   pageSize: 10,
                   pageSizeOptions: ['10','20','30'],
                   showSizeChanger: true,
                   showQuickJumper: true
                 }}/>
        <Add/>
        <Modal title={`确定删除如下${this.state.selectedRowNames.length}个用户?`}
               visible={this.props.show_delete}
               onOk = {()=>{this.props.delete_item(this.state.selectedRowKeys);}}
               onCancel={()=>this.props.to_show_delete(false)}
               confirmLoading={!this.props.show_delete}
        >
          <p>{this.state.selectedRowNames.join(',')}</p>
        </Modal>
      </div>
    )
  }

  componentDidMount() {
    this.props.get_all_users();
  }

  componentDidUpdate() {
    if(this.props.after_register){
      this.props.get_all_users();
    }
    if(this.props.delete_msg.show) {
      this.showMessage(this);
    }
  }
}


function mapStateToProps(state) {
  return {
    user: state.user.userList,
    username: state.global.username,
    isLoading: state.global.isFetching,
    after_register: state.user.after_register,
    show_delete: state.user.show_delete,
    delete_msg: state.user.delete_msg,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    get_all_users: bindActionCreators(action.get_all_users,dispatch),
    delete_item: bindActionCreators(action.delete_item, dispatch),
    show_register: bindActionCreators(action.register_control,dispatch),
    to_show_delete: bindActionCreators(action.to_show_delete, dispatch),
    close_msg: bindActionCreators(action.clear_msg, dispatch),
    change_page: bindActionCreators(indexAction.change_page, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)


