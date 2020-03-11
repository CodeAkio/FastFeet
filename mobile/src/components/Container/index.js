import React from 'react';
import PropTypes from 'prop-types';

import { SafeArea, Content } from './styles';

export default function Container({ children, style, background }) {
  return (
    <SafeArea background={background}>
      <Content style={style} background={background}>
        {children}
      </Content>
    </SafeArea>
  );
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  background: PropTypes.bool,
};

Container.defaultProps = {
  style: {},
  background: false,
};
