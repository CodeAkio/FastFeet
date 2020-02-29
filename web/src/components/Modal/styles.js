import styled from 'styled-components';

export const Container = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const ModalContent = styled.div`
  z-index: 1;
  background-color: #fff;
  margin: auto;
  padding: 25px;
  border: 1px solid #00000033;
  border-radius: 4px;
  width: 450px;
  > h4 {
    font-size: 14px;
    color: #444;
  }
  > p {
    font-size: 16px;
    color: #666;
    margin-top: 4px;
  }
  > hr {
    margin: 8px 0px;
    border: 1px solid #eee;
  }
`;
