import React, { Component } from 'react'
import AddArticle from '../Article/AddArticle'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { action } from '../../reducers'


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
    page: state.global.page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    change_page: bindActionCreators(action.change_page, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManager)


