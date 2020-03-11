import styled from 'styled-components/native';

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  background: ${props => (props.background ? '#fff' : 'transparent')};
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 20px;
  margin-top: ${props => (props.background ? '0' : '70px')};
`;
