import PropTypes from 'prop-types';
import React from 'react';

const Example = ({ loading }) => {
  if (loading) {
    return (
      <div />
    );
  }

  return (
    <p />
  );

};

export default Example;
