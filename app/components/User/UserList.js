import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {action} from '../../reducers/UserAction'
import {Button, Table, Divider, Tooltip, Menu, Icon, Dropdown,Form, Modal} from 'antd'
import Add from './AddUser'
import Preview from './Preview'
import Register from './RegisterForm'


const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: '_id',
    render: (text,record) => (
        <Tooltip placement='bottom' title='点击进入编辑界面' mouseEnterDelay={2}>
          <Link to={{pathname: '/admin/detail', _id: record._id}}>{text}</Link>
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



class List extends Component {
  state = {selectedRowKeys: [], visible: false}

  onSelectedChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys});
  }

  handleAction = (e) => {
    switch (e.key) {
      case 'fresh':
        this.props.get_all_users();
        return;
      case 'add':
        this.props.show_register(true);
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
    const {selectedRowKeys, visible} = this.state;
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
          <Table rowSelection={rowSelection} bordered={true} columns={columns} dataSource={this.props.user} rowKey="_id" />
        <Add/>
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
  }
}


function mapStateToProps(state) {
  return {
    user: state.user.userList,
    isLoading: state.global.isFetching,
    after_register: state.user.after_register
  }
}

function mapDispatchToProps(dispatch) {
  return {
    get_all_users: bindActionCreators(action.get_all_users,dispatch),
    show_register: bindActionCreators(action.register_control,dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)


