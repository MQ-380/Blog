import React, { Component } from 'react'
import { Layout, Menu, Icon, Popover, Avatar, Badge, MenuItemGroup} from 'antd'
import Edit from '../User/EditUser'
import Avator from '../Normal/Avatar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import UserManager from '../Admin/UserManager'
import ArticleManager from '../Admin/ArticleManager'
import {action} from '../../reducers/index'
import { bindActionCreators } from 'redux'

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
                onSelect={(e) => this.props.change_page(e.key)}
              >
                  <Menu.Item key='user'><span><Icon type='user'/>用户管理</span></Menu.Item>
                <SubMenu key={'Article'} title={<span><Icon type='book'/>文章管理</span>}>
                  <Menu.Item key='article'>文章列表</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{padding: '9 24px 24px'}}>
              <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 200}}>
                {this.props.page === 'user' && <UserManager />}
                {this.props.page === 'article' && <ArticleManager/> }
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
    username: state.global.username,
    page: state.global.page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    change_page: bindActionCreators(action.change_page, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel)