import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'antd'
import { action as ShowAction } from '../../reducers/ShowAction'
import Profile from '../../components/Display/Profile'
import '../../components/Style/Main.css'

class Home extends Component {
  render () {
    return (
      <div style={{height: '100%'}}>
        {this.props.userExists&&
          <div className={'home'}>
            <div className={'main'}>
              Main
            </div>
            <div className={'sliderBar'}>
              <Profile user={!!this.props.match.params.username? this.props.match.params.username : undefined}/>
            </div>
          </div>
        }
        {
          !this.props.userExists &&
            404
        }
      </div>
    )
  }

  componentWillMount () {
    if(this.props.match.params.username) {
      console.log(this.props.match.params.username);
      this.props.check_user(this.props.match.params.username);
    } else {
      this.props.set_check(true);
    }
  }

}

const mapStateToProps = (state) => {
  return {
    userExists: state.show.userExists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    check_user: bindActionCreators(ShowAction.check_user, dispatch),
    set_check: bindActionCreators(ShowAction.set_check, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
