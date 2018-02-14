import React, { Component } from 'react';

export default class Example extends Component {
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

