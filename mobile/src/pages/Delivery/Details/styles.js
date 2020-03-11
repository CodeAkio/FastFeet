import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { BoxShadow } from '~/components/BoxShadow';

export const Card = styled(BoxShadow)`
  padding: 14px;
  margin-bottom: 10px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 8px;
`;

export const CardHeaderIcon = styled(Icon).attrs({
  size: 20,
  color: '#7d40e7',
})``;

export const CardHeaderTitle = styled.Text`
  padding-left: 6px;
  font-size: 14px;
  font-weight: bold;
  color: #7d40e7;
`;

export const Data = styled.View`
  flex-direction: column;
  padding-bottom: ${props => (props.last ? 0 : '16px')};
`;

export const DataRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const DataTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #999;
  margin-bottom: 6px;
`;

export const DataText = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const CardAction = styled(BoxShadow)`
  flex-direction: row;
  background: #f8f9fd;
  margin-bottom: 10px;
`;

export const ActionCenter = styled.View`
  flex: 3;
  border-left-width: 1px;
  border-right-width: 1px;
  border-left-color: #0000001a;
  border-right-color: #0000001a;
`;

export const ActionButton = styled(RectButton)`
  flex: 3;
  flex-direction: column;
  height: 84px;
  align-items: center;
  justify-content: center;
`;

export const ActionText = styled.Text`
  text-align: center;
  margin-top: 2px;
  font-size: 12px;
  color: #999;
`;
