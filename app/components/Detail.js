import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Detail extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>{this.props.names}</h2>
        <li>{this.props.times}</li>
        <li><Link to={'/'}>Return</Link></li>
      </div>
    )
}
}


const mapStateToProps = function (state, p) {
  return {

    names: state.user.userList.filter((item) => {
      return item.userName === p.location.name
    })[0].userName,
    times: state.user.userList.filter((item) => {
      return item.userName === p.location.name
    })[0].time
//this.props.state.user.userList[this.props.param.name].userName
  }
}

export default connect(
  mapStateToProps
)(Detail)