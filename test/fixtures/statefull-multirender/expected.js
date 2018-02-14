import React, { Component } from 'react';

export default class Example extends Component {
  renderHeader() {
    return <hr />;
  }
  render() {
    if (this.props.loading) {
      return <p data-name="Example" />;
    }
    return <div data-name="Example" />;
  }
}
