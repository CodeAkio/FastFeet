/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function OptionsList({ visible, children }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open !== visible) {
      setOpen(!open);
    }
  }, [visible]);

  return (
    <Container visible={open}>
      <ul>{children}</ul>
    </Container>
  );
}

OptionsList.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};
