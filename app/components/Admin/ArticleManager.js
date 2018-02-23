import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { action } from '../../reducers/PageAction'


class UserManager  extends Component {
  render () {
    return (
      <div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    page: state.page.now_page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    change_page: bindActionCreators(action.change_page, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManager)


