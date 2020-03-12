import styled from 'styled-components/native';

export const Scroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  flex: 1;
`;
