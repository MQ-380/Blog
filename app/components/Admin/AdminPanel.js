import React, { Component } from 'react'
import { Layout, Menu, Icon, Popover, Avatar, Badge, MenuItemGroup} from 'antd'
import Add from '../User/AddUser'
import List from '../User/UserList'
import Detail from '../User/UserDetail'
import Edit from '../User/EditUser'
import Avator from '../Normal/Avatar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

const {SubMenu} = Menu
const {Header, Content, Sider} = Layout


class AdminPanel extends Component {
  render () {
    return (
      <div>
        {this.props.notAdmin}
        <Layout>
          <Header className='header' style={{position: 'relative'}}>
            <div className='AdminLogo' style={{position:'absolute', right:'5%'}}>
              <Avator/>
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
                  <Menu.Item key='userList'><span><Icon type='user'/>用户管理</span></Menu.Item>
                <SubMenu key={'Article'} title={<span><Icon type='book'/>文章管理</span>}>
                  <Menu.Item key='articleList'>文章列表</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{padding: '9 24px 24px'}}>
              <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 200}}>
                <Router>
                  <Switch>
                    <Route path='/admin/detail' component={Detail}/>
                    <Route path='/admin/edit' component={Edit}/>
                    <Route path='/admin/add' component={Add}/>
                    <Route path='/admin' component={List}/>
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