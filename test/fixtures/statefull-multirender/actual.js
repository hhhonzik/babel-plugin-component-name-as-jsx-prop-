import React, { Component } from 'react';

export default class Example1 extends Component {
  renderHeader() {
    return <hr />;
  }
  render() {
    if (this.props.loading) {
      return <p />;
    }
    return <div />;
  }
}

let Example2 = class Example2 extends Component {
  renderHeader() {
    return <hr />;
  }
  render() {
    if (this.props.loading) {
      return <p />;
    }
    return <div />;
  }
}

