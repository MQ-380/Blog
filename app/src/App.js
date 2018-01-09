import React, {Component} from 'react';
import List from '../src/List.js';

export default class App extends Component {
  render() {
    console.log('something');

    return (
      <div>
        <List name='a' />
      </div>
    );
  };
}
