import React, { Component } from 'react'
import { Tag, Input, Tooltip, Icon } from 'antd/lib/index'

export default class TagSelect extends Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
    isUpdated: false,
  };

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag)
    this.setState({tags})
  }

  showInput = () => {
    this.setState({inputVisible: true}, () => this.input.focus())
  };

  handleInputChange = e => {
    this.setState({inputValue: e.target.value})
  }

  handleInputConfirm = () => {
    const state = this.state;
    let {inputValue, tags} = state
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue]
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: ''
    });
  };

  saveInputRef = input => (this.input = input)

  render () {
    let {tags, inputVisible, inputValue} = this.state
    return (
      <div>
        <h3>选择文章标签</h3>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag
              key={tag}
              closable={true}
              afterClose={() => this.handleClose(tag)}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          )
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{width: 78}}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{background: '#fff', borderStyle: 'dashed'}}
          >
            <Icon type="plus"/> 增加标签
          </Tag>
        )}
      </div>
    );
  }

  componentDidUpdate () {
    if (this.props.nowTags && !this.state.isUpdated) {
      console.log('in will')
      this.setState({tags: this.props.nowTags, isUpdated: true})
    }
  }
}
