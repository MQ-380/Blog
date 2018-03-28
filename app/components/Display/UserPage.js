import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Profile from '../../components/Display/Profile'

import '../../components/Style/Main.css'

class UserPage extends Component {
  render () {
    return (
      <div style={{height: '100%'}}>
        <div className={'home'}>
          <div className={'main'}>Main</div>
          <div className={'sliderBar'}>
            <Profile/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    publishInfo: state.show.userPublicInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
