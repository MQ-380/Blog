import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { action } from '../../reducers/UserAction'

class AddUser extends Component {
  constructor (props) {
    super(props)
  }

  onChanges(e) {
    this.props.update_name(e.target.value);
  }

  add(){
    this.props.add_new_users(this.props.name)
  }

  render () {
    let {isFetching} = this.props;

    return (
      <div>
        <form>
          <label>name</label>
          <input value={this.props.name} onChange={this.onChanges.bind(this)}/>
        </form>
        <button onClick={this.add.bind(this)}>Add</button>
        {isFetching &&  <h1>LOADING</h1>}
        {this.props.msg && <div>{this.props.msg.content}</div>}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isFetching: state.global.isFetching,
    msg: state.global.msg,
    name: state.user.userName
  }
}

function mapDispatchToProps (dispatch) {
  return {
    add_new_users: bindActionCreators(action.add_new_users, dispatch),
    update_name: bindActionCreators(action.update_name, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUser)