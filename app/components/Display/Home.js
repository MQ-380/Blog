import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'antd'
import { action as ShowAction } from '../../reducers/ShowAction'
import UserPage from '../../components/Display/UserPage'
import HomePage from '../../components/Display/HomePage'

class Home extends Component {
  state = {visitUser: false}

  render () {
    return (
      <div style={{height: '100%'}}>
        {this.state.visitUser && this.props.userExists && <UserPage/>}
        {this.state.visitUser && !this.props.userExists && <div>404</div>}
        {!this.state.visitUser && <HomePage/>}
      </div>
    );
  }

  componentWillMount () {
    if (this.props.match.params.username) {
      this.setState({visitUser: true})
      this.props.check_user(this.props.match.params.username);
    }
  }
}

const mapStateToProps = state => {
  return {
    userExists: state.show.userExists,
    publicInfo: state.show.userPublicInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    check_user: bindActionCreators(ShowAction.check_user, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)
