import styled from 'styled-components';

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
