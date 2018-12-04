import React, { Component } from 'react';

export default class Example1 extends Component {
  renderHeader() {
    return <hr />;
  }
  render() {
    if (this.props.loading) {
      return <p data-name="Example1" />;
    }
    return <div data-name="Example1" />;
  }
}

let Example2 = class Example2 extends Component {
  renderHeader() {
    return <hr />;
  }
  render() {
    if (this.props.loading) {
      return <p data-name="Example2" />;
    }
    return <div data-name="Example2" />;
  }
};
