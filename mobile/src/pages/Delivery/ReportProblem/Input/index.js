/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { InputShape, TInput } from './styles';

export default function Input({ ...rest }) {
  return (
    <InputShape>
      <TInput {...rest} />
    </InputShape>
  );
}
