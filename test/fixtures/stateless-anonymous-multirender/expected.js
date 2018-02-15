import PropTypes from 'prop-types';
import React from 'react';

const Example = ({ loading }) => {
  if (loading) {
    return <div data-name="Example" />;
  }

  return <p data-name="Example" />;
};

export default Example;
