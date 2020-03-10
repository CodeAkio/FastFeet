import styled from 'styled-components/native';

export const Header = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ProfileView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  height: 70px;
  width: 70px;
  border-radius: 35px;
`;

export const WelcomeView = styled.View`
  margin-left: 12px;
  flex-direction: column;
`;

export const WelcomeText = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const Name = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;

export const DeliveriesHeader = styled.View`
  padding-top: 22px;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`;

export const DeliveriesTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;

export const Status = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

export const StatusItem = styled.View`
  margin-left: 15px;
  border-bottom-width: ${props => (props.selected ? '1px' : 0)};
  border-bottom-color: #7d40e7;
`;

export const StatusText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${props => (props.selected ? '#7D40E7' : '#999')};
`;

export const DeliveriesList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Delivery = styled.View.attrs({
  shadowColor: '#0000001A',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowRadius: 1.5,
  shadowOpacity: 3.0,
})`
  background-color: #fff;
  border-radius: 4px;
  margin: 10px 2px 20px;
`;

export const DeliveryHeader = styled.View`
  padding: 12px;
  flex-direction: row;
`;

export const DeliveryTitle = styled.Text`
  margin-left: 10px;
  color: #7d40e7;
  font-size: 14px;
  font-weight: bold;
`;

export const DeliveryStatus = styled.View`
  flex: 1;
  padding: 12px;
`;

export const DeliveryInfo = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  background: #f8f9fd;
  padding: 20px;
`;

export const Data = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

export const DataLabel = styled.Text`
  font-size: 8px;
  font-weight: bold;
  color: #999;
`;

export const DataText = styled.Text`
  margin-top: 1px;
  font-size: 12px;
  font-weight: bold;
  color: #444;
`;

export const DataLink = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #7d40e7;
`;
