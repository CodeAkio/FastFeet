import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;

  h1 {
    font-size: 24px;
    color: #444;
    padding: 16px 0;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 20px;
    tr th {
      background: none;
      padding: 14px 26px;
      text-align: left;
      font-size: 16px;
      color: #444;
    }
    tr td {
      padding: 20px 26px;
      background: #fff;
      font-size: 16px;
      color: #666;
    }
    td:nth-child(1) {
      width: 5%;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    td:nth-child(2) {
      width: 30%;
    }
    td:nth-child(3) {
      width: 50%;
    }
    td:nth-child(4) {
      text-align: center;
      width: 5%;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
  }
`;
