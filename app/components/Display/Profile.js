import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { Modal } from 'antd/lib/index'

class Profile extends Component {
  showMessage () {
    let msg = {
      title: this.props.msg.title,
      content: this.props.msg.content,
    };
    if (this.props.msg.type === 'error') {
      Modal.error(msg);
    } else if (this.props.msg.type === 'success') {
      Modal.success(msg);
    }
  }

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
            {this.props.publicInfo.username}
          </h1>
          <p
            style={{
              fontSize: '1.2em',
              color: '#b0cadb',
              fontWeight: '300'
            }}
          >
            {this.props.publicInfo.slogan === ''
              ? '作者未设置签名'
              : this.props.publicInfo.slogan}
          </p>
          <div
            className={'link'}
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              flexWrap: 'wrap'
            }}
          >
            <Button
              size="large"
              shape="circle"
              icon="github"
              disabled={!this.props.publicInfo.links.github}
              onClick={() => window.open(this.props.publicInfo.links.github)}
            />
            <Button
              size="large"
              shape="circle"
              icon="weibo"
              disabled={!this.props.publicInfo.links.weibo}
              onClick={() => window.open(this.props.publicInfo.links.weibo)}
            />
            <Button
              size="large"
              shape="circle"
              icon="facebook"
              disabled={!this.props.publicInfo.links.facebook}
              onClick={() => window.open(this.props.publicInfo.links.facebook)}
            />
            <Button
              size="large"
              shape="circle"
              icon="twitter"
              disabled={!this.props.publicInfo.links.twitter}
              onClick={() => window.open(this.props.publicInfo.links.twitter)}
            />
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    this.showMessage.bind(this)()
  }
}

const mapStateToProps = state => {
  return {
    msg: state.global.msg,
    publicInfo: state.show.userPublicInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
