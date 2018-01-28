import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {action} from '../../reducers/UserAction'
import Add from './AddUser'
import Preview from './Preview'

class List extends Component {

  render() {
    let text = this.props.user.map((item) => {
      return (
        <Preview name={item.userName} id={item._id}/>
      )
    });
    let add = true;
    return (
      <div>
        <button onClick={this.props.get_all_users}>fresh</button>
        {text}
        <button onClick={()=>{add=true}}>add</button>
        {add && <Add/>}

      </div>
    )
  }

  componentDidMount() {
    this.props.get_all_users();
  }
}

List.defaultProps = {
    user: []
}


function mapStateToProps(state) {
  return {
    user: state.user.userList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    get_all_users: bindActionCreators(action.get_all_users,dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)