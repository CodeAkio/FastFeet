import styled from 'styled-components/native';

import { BoxShadow } from '~/components/BoxShadow';

export const InputShape = styled(BoxShadow)`
  height: 300px;
  padding: 20px;

  flex-direction: row;
  align-items: flex-start;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  font-size: 16px;
  color: #999;
`;
