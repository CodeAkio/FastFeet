import React from 'react';
import PropTypes from 'prop-types';

import { SafeArea, Content } from './styles';

export default function Container({ children, style }) {
  return (
    <SafeArea>
      <Content style={style}>{children}</Content>
    </SafeArea>
  );
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Container.defaultProps = {
  style: {},
};
