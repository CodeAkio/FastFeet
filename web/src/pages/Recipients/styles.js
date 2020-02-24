import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1200px;
  margin: 36px auto;

  table {
    td:first-child {
      width: 5%;
    }
    td:nth-child(2) {
      width: 30%;
    }
    td:nth-child(3) {
      width: 50%;
    }
    td:last-child {
      text-align: center;
      width: 5%;
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
    button {
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

export const HeaderDiv = styled.div`
  width: 100%;
  display: inline-block;
  margin-top: 30px;

  > div {
    position: relative;
    > input {
      float: left;
      height: 36px;
      width: 236px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding-left: 40px;
    }
    > i {
      position: absolute;
      left: 16px;
      top: 10px;
      color: #999;
    }
  }

  > button {
    float: right;
    height: 36px;
    background: #7d40e7;
    border-radius: 4px;
    padding: 8px 16px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
