import React, { Component } from 'react'
import { Layout, Menu, Icon, Popover, Avatar, Badge } from 'antd'
import Add from '../User/AddUser'
import List from '../User/UserList'
import Detail from '../User/UserDetail'
import Edit from '../User/EditUser'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

const {SubMenu} = Menu
const {Header, Content, Sider} = Layout
const content = (
<div>
  aaaaa
</div>
)

class AdminPanel extends Component {
  render () {
    return (
      <div>
        {this.props.notAdmin}
        <Layout>
          <Header className='header' style={{position: 'relative'}}>
            <div className='AdminLogo' style={{position:'absolute', right:'5%'}}>
              <Popover content={content} title={`欢迎,${this.props.username}`} placement="bottom" trigger='click'>
                <Badge count={99}>
                  <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle',cursor:'pointer' }} shape="square" size="large">
                    {this.props.username}
                  </Avatar>
                </Badge>
              </Popover>
            </div>
          </Header>
          <Layout>
            <Sider width={200} style={{background: '#fff'}}>
              <Menu
                mode='inline'
                defaultSelectedKeys={['userList']}
                defaultOpenKeys={['Users']}
                style={{height: '100%', borderRight: 0}}
              >
                <SubMenu key={'Users'} title={<span><Icon type='user'/>用户管理</span>}>
                  <Menu.Item key='userList'>用户列表</Menu.Item>
                  <Menu.Item key='addUser'>增加用户</Menu.Item>
                </SubMenu>
                <SubMenu key={'Article'} title={<span><Icon type='book'/>文章管理</span>}>
                  <Menu.Item key='articleList'>文章列表</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{padding: '9 24px 24px'}}>
              <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 200}}>
                <Router>
                  <Switch>
                    <Route path='/detail' component={Detail}/>
                    <Route path='/edit' component={Edit}/>
                    <Route path='/add' component={Add}/>
                    <Route path='/' component={List}/>
                  </Switch>
                </Router>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notAdmin: !state.global.isAdmin,
    username: state.global.username
  }
}

export default connect(mapStateToProps)(AdminPanel)