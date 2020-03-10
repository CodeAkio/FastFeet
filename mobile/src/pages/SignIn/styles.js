import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from './Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  background: #7d40e7;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Logo = styled.Image`
  height: 48px;
  width: 244px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 40px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 15px;
`;

export const SubmitButton = styled(Button)`
  background: #82bf18;
`;
