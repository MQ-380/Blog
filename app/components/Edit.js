import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { action } from '../reducers/UserAction'

class Edit extends Component {
  constructor (props) {
    super(props)
  }

  onChanges(e) {
    this.props.update_name(e.target.value);
  }

  edit() {
    this.props.edit_name(this.props._id, this.props.editName)
  }


  render() {
    return (
      <div>
        <form>
          <label>name</label>
          <input type='input' value={this.props.editName} onChange={this.onChanges.bind(this)} />
        </form>
        <button onClick={this.edit.bind(this)}>Submit</button>
        {/*<button onClick={history.go(-1)}>Back</button>*/}
      </div>
    )
  }
}

const mapStateToProps = (state,p)=>{
  return {
    _id: p.location._id,
    name: state.user.userList.filter((item)=>{
      return item._id === p.location._id
    })[0].userName,
    editName: state.user.editingName
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    update_name: bindActionCreators(action.updating_name, dispatch),
    edit_name: bindActionCreators(action.edit_name, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit)