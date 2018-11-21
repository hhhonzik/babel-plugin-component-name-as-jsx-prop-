import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

export const Example = () => <React.Fragment />;

export class Example2 extends React.PureComponent {
  render() {
    return <Fragment />;
  }
}

export class Example3 extends React.Component {
  render() {
    return <React.Fragment />;
  }
}

// babel 7
// export const Example4 = () => <></>;