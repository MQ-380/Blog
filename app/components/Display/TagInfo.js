import React, { Component } from 'react'
import { connect } from 'react-redux'

class Profile extends Component {
  render () {
    return (
      <div>
        <div
          style={{
            margin: '2em 2em 0'
          }}
        >
          <h1
            style={{
              color: 'white',
              fontSize: '2.5em',
              marginBottom: '0em'
            }}
          >
            {this.props.publicInfo.tagName}
          </h1>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    publicInfo: state.show.userPublicInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
