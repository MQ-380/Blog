import React, {Component} from 'react';
import ReactDom from 'react-dom';

export default class List extends Component {
  render() {
    return(
      <li>{this.props.name}</li>
    );
  }
}

