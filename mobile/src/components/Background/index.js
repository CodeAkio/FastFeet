import React from 'react';
import { StatusBar } from 'react-native';

import PropTypes from 'prop-types';

import { Container, Top, Content } from './styles';

export default function Background({ children }) {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Container>
        <Top />
        <Content>{children}</Content>
      </Container>
    </>
  );
}

Background.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
