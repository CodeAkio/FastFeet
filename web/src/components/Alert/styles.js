import styled from 'styled-components';
import { darken } from 'polished';

export const CancellationAlert = styled.div`
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

export const CancellationAlertContent = styled.div`
  background-color: #fff;
  margin: auto;
  padding: 25px;
  border: 1px solid #00000033;
  border-radius: 4px;
  width: 450px;
  h3 {
    font-size: 18px;
    color: #de3b3b;
    text-transform: uppercase;
    padding-bottom: 8px;
  }
  p {
    font-size: 16px;
    color: #666;
    margin-top: 4px;
  }
  > div {
    display: flex;
    margin-top: 16px;
    border-top: 1px solid #eee;
    padding-top: 16px;
  }
`;

export const CancelButton = styled.button`
  display: flex;
  margin-left: 16px;
  height: 36px;
  background: #ccc;
  border-radius: 4px;
  border: 0;
  padding: 8px 16px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  flex-direction: row;
  align-items: center;
  &:hover {
    background: ${darken(0.08, '#ccc')};
  }
`;

export const ConfirmButton = styled.button`
  display: flex;
  height: 36px;
  background: #7d40e7;
  border-radius: 4px;
  border: 0;
  padding: 8px 16px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  flex-direction: row;
  align-items: center;
  &:hover {
    background: ${darken(0.08, '#7d40e7')};
  }
`;
