import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  position: relative;
  background: #fff;
`;

export const Top = styled.View`
  position: relative;
  background: #7d40e7;
  height: 155px;
`;

export const Content = styled.View`
  flex: 1;
  position: absolute;
  z-index: 2;
  height: 100%;
  width: 100%;
`;
