import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Button} from 'antd'
import Profile from '../../components/Display/Profile'
import '../../components/Style/Main.css'

class Home  extends Component {
  render () {
    return (
      <div className={'home'}>
        <div className={'main'}>
          Main
        </div>
        <div className={'sliderBar'}>
          <Profile/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
