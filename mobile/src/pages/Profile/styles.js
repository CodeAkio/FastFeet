import styled from 'styled-components/native';

import GlobalContainer from '~/components/Container';
import Button from '~/components/Button';

export const Container = styled(GlobalContainer)`
  justify-content: center;
  align-items: center;
  padding: 0 35px;
`;

export const Avatar = styled.Image`
  height: 136px;
  width: 136px;
  border-radius: 68px;
`;

export const InfoSection = styled.View`
  align-self: stretch;
  margin-top: 40px;
`;

export const InfoGroup = styled.View`
  margin-bottom: 15px;
`;

export const Header = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const TextInfo = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;

export const LogoutButton = styled(Button)`
  margin-top: 15px;
  background: #e74040;
`;
