import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {action} from '../../reducers/UserAction'
import {Button, Table, Divider, Tooltip, Menu, Icon, Dropdown} from 'antd'
import Add from './AddUser'
import Preview from './Preview'


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

const actions = (
  <Menu>
    <Menu.Item key={'fresh'}><span><Icon type={'reload'}/>刷新</span></Menu.Item>
    <Menu.Item key={'add'}><span><Icon type={'plus'}/>新增用户</span></Menu.Item>
    <Menu.Item key={'delete'}><span><Icon type={'minus'}/>删除所选用户</span></Menu.Item>
  </Menu>
)

class List extends Component {
  state = {selectedRowKeys: []}

  onSelectedChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys});
  }

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
            <Dropdown overlay={actions}>
              <Button>
                用户操作<Icon type={'down'}/>
              </Button>
            </Dropdown>
          </div>
        </div>
          <br/><br/>
          <Table rowSelection={rowSelection} bordered={true} columns={columns} dataSource={this.props.user} rowKey="_id" />

      </div>
    )
  }

  componentDidMount() {
    this.props.get_all_users();
  }
}


function mapStateToProps(state) {
  return {
    user: state.user.userList,
    isLoading: state.global.isFetching,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    get_all_users: bindActionCreators(action.get_all_users,dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)