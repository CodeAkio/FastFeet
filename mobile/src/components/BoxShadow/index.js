import styled from 'styled-components/native';

export const BoxShadow = styled.View.attrs({
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
  margin-left: 2px;
  margin-right: 2px;
`;
