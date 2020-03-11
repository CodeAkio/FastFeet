import styled from 'styled-components/native';

import { BoxShadow } from '~/components/BoxShadow';

export const Title = styled.Text`
  align-self: center;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  padding-bottom: 12px;
`;

export const ProblemsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Card = styled(BoxShadow)`
  padding: 18px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: #999;
`;

export const Date = styled.Text`
  font-size: 12px;
  color: #c1c1c1;
  margin-left: 8px;
`;
