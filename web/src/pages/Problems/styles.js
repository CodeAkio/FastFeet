import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1200px;
  margin: 36px auto;

  table {
    td:first-child {
      width: 20%;
    }
    td:nth-child(2) {
      width: 75%;
    }
    td:last-child {
      position: relative;
      text-align: center;
      width: 5%;
      > button {
        border: 0;
        background: none;
        position: relative;
      }
    }
  }
`;

export const OptionsList = styled.div`
  z-index: 1;
  position: absolute;
  width: 200px;
  left: calc(50% - 100px);
  top: calc(50% + 26px);
  background: #fff;
  border-radius: 4px;
  padding: 14px 18px;
  display: ${props => (props.visible ? 'block' : 'none')};
  border: 1px solid #0000001a;
  text-align: left;
  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 7px);
    top: -10px;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 9px solid #0000001a;
  }
  &::after {
    content: '';
    position: absolute;
    left: calc(50% - 6px);
    top: -9px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 9px solid #fff;
  }
  ul li {
    display: flex;
    align-items: center;
    padding: 8px 0;
    > a {
      color: #999;
      font-size: 14px;
      margin-left: 8px;
    }
    > button {
      background: none;
      border: 0;
      color: #999;
      font-size: 14px;
      margin-left: 8px;
    }
  }
  ul li + li {
    border-top: 1px solid #eee;
  }
`;

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
