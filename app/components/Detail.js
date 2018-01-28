import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { action } from '../reducers/UserAction'
import { bindActionCreators } from 'redux'

class Detail extends Component {
  constructor (props) {
    super(props)
  }

  delete() {
    this.props.delete_item(this.props._id);
  }

  render () {
    return (
      <div>
        <h2>{this.props.names}</h2>
        <li>{this.props.times}</li>
        {this.props.hasEdit && <li>EditTime: {this.props.hasEdit}</li>}
        <li><Link to={{pathname: '/edit',_id:this.props._id}}>Edit</Link></li>
        <li><Link to={'/'}>Return</Link></li>
        <button onClick={this.delete.bind(this)}>Delete</button>
      </div>
    )
  }
}

const mapStateToProps = function (state, p) {
  let s = state.user.userList.filter((item) => {
    return item._id === p.location._id
  })[0];
  let t;
  if(s) {
    t = {
      names: s.userName,
      times: s.time,
      _id: p.location._id,
      hasEdit: s.editTime
    }
  } else {
    t = {
      names: '',
      times: '',
      _id: '',
      hasEdit:''
    }
  }
  return t
}


const mapDispatchToProps = (dispatch) => {
  return {
    delete_item: bindActionCreators(action.delete_item, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail)