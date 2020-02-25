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

  form {
    input {
      height: 36px;
      padding: 0 15px;
      color: #999;
      margin: 0 0 10px;
      &::placeholder {
        color: #999;
      }
    }
    > button {
      margin: 5px 0 0;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }
    }
    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
  > button {
    width: 100%;
    margin: 10px 0 0;
    height: 44px;
    background: #f64c75;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.08, '#f64c75')};
    }
  }
`;

export const OptionsList = styled.div`
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

export const Modal = styled.div`
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
  background-color: #fff;
  margin: auto;
  padding: 25px;
  border: 1px solid #00000033;
  border-radius: 4px;
  width: 450px;
  h4 {
    font-size: 14px;
    color: #444;
  }
  p {
    font-size: 16px;
    color: #666;
    margin-top: 4px;
  }
`;
