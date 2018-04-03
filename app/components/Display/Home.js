import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'antd'
import { action as ShowAction } from '../../reducers/ShowAction'
import UserTagPage from '../../components/Display/UserTagPage'
import HomePage from '../../components/Display/HomePage'

class Home extends Component {
  state = {visitUser: false, visitTag: false}

  render () {
    return (
      <div style={{height: '100%'}}>
        {this.state.visitUser && this.props.userExists && <UserTagPage type={'user'}/>}
        {this.state.visitTag && this.props.tagExists && <UserTagPage type={'tag'}/>}
        {((this.state.visitUser && !this.props.userExists) || (this.state.visitTag && !this.props.tagExists)) &&
        <div>404</div>}
        {!this.state.visitUser && !this.state.visitTag && <HomePage/>}
      </div>
    );
  }

  componentWillMount () {
    console.log(this.props.match.params)
    if (this.props.match.params.username) {
      this.setState({visitUser: true})
      this.props.check_user(this.props.match.params.username);
    } else if (this.props.match.params.tag) {
      this.setState({visitTag: true})
      this.props.check_tags(this.props.match.params.tag)
    }
  }
}

const mapStateToProps = state => {
  return {
    userExists: state.show.userExists,
    tagExists: state.show.tagExists,
    publicInfo: state.show.userPublicInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    check_user: bindActionCreators(ShowAction.check_user, dispatch),
    check_tags: bindActionCreators(ShowAction.check_tags, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)
