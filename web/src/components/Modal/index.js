/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container, ModalContent } from './styles';

export default function Modal({ visible, children }) {
  const [open, setOpen] = useState(false);
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    if (open !== visible) {
      setOpen(!open);
    }
  }, [visible]);

  function handleToggleFocusModal() {
    setBlur(false);
  }

  function handleToggleBlurModal() {
    setBlur(true);
  }

  function handleToggleClickOutModal() {
    if (open && blur) {
      setOpen(false);
      setBlur(false);
    }
  }

  return (
    <Container visible={open} onClick={() => handleToggleClickOutModal()}>
      <ModalContent
        onMouseEnter={() => handleToggleFocusModal()}
        onMouseLeave={() => handleToggleBlurModal()}
      >
        {children}
      </ModalContent>
    </Container>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};
