import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { action } from '../../reducers/PageAction'
import { bindActionCreators } from 'redux'
import { Button } from 'antd'

class Detail extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <h2>1234</h2>
        <button
          onClick={e => {
            this.props.change_page('user')
          }}
        >
          返回
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    page: state.page.now_page
  };
};

const mapDispatchToProps = dispatch => {
  return {
    change_page: bindActionCreators(action.change_page, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
