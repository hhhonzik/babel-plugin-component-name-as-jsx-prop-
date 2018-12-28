import React, { Component } from 'react';

export default class Example1 extends Component {
  render() {
    return <div data-name="Example1" someOtherAttribute />;
  }
}

let Example2 = class Example2 extends Component {
  render() {
    return <div data-name="Example2" someOtherAttribute />;
  }
};
