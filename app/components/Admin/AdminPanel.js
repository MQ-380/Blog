import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import Avator from '../Normal/Avatar'
import { connect } from 'react-redux'
import UserManager from '../User/UserManager'
import ArticleList from '../Article/ArticleList'
import { action as pageAction } from '../../reducers/PageAction'
import AddArticle from '../Article/Publish'
import ArticleDetail from '../Article/ArticleDetail'
import CommentDetail from '../Article/CommentDetail'
import { bindActionCreators } from 'redux'

const {SubMenu} = Menu
const {Header, Content, Sider} = Layout

class AdminPanel extends Component {
  render () {
    return (
      <div>
        {this.props.notAdmin}
        <Layout>
          <div
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              zIndex: '9999',
              width: '100%'
            }}
          >
            <Header className="header" style={{position: 'relative'}}>
              <div
                className="AdminLogo"
                style={{position: 'absolute', right: '5%'}}
              >
                <Avator/>
              </div>
            </Header>
          </div>
          <Layout>
            <Sider
              width={200}
              style={{position: 'fixed', top: 64, height: '100%'}}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={['message']}
                defaultOpenKeys={['message']}
                style={{height: '100%', borderRight: 0}}
                onSelect={e => this.props.change_page(e.key)}
              >
                <Menu.Item key="message">
                  <span>
                    <Icon type="inbox"/>消息列表
                  </span>
                </Menu.Item>
                <SubMenu
                  key={'Article'}
                  title={
                    <span>
                      <Icon type="book"/>文章管理
                    </span>
                  }
                >
                  <Menu.Item key="createArticle">
                    <Icon type="cloud-upload-o"/>发表文章
                  </Menu.Item>
                  <Menu.Item key="ArticleList">
                    <Icon type="table"/>文章列表
                  </Menu.Item>
                </SubMenu>
                {!this.props.notAdmin &&
                <Menu.Item key="user">
                  <span>
                    <Icon type="user"/>用户管理
                  </span>
                </Menu.Item>}
                <Menu.Item key="data">
                  <span>
                    <Icon type="dashboard"/>浏览数据
                  </span>
                </Menu.Item>

              </Menu>
            </Sider>
            <Layout>
              <Content
                style={{
                  background: '#fff',
                  padding: 24,
                  margin: 0,
                  minHeight: 200,
                  position: 'absolute',
                  top: 80,
                  left: 220,
                  width: 'calc(100% - 220px)'
                }}
              >
                {this.props.page.includes('user') && <UserManager/>}
                {this.props.page.includes('createArticle') && <AddArticle/>}
                {this.props.page.includes('ArticleList') && <ArticleList/>}
                {this.props.page.includes('articleDetail') && <ArticleDetail/>}
                {this.props.page.includes('commentDetail') && <CommentDetail/>}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notAdmin: !state.global.isAdminLogin,
    username: state.global.username,
    page: state.page.now_page
  };
};

const mapDispatchToProps = dispatch => {
  return {
    change_page: bindActionCreators(pageAction.change_page, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel)
