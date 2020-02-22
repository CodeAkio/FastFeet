import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  background: #ffffff;
  box-shadow: 0px 0px 10px #00000033;
  border-radius: 4px;
  padding: 60px 30px;

  img {
    align-self: center;
    margin-bottom: 40px;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      font-size: 14px;
      font-weight: bold;
      text-align: left;
      letter-spacing: 0;
      color: #444;
      margin-bottom: 8px;
    }

    input {
      background: #fff;
      border: 1px solid #dddddd;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      color: #999;
      font-size: 16px;
      margin: 0 0 10px;
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 45px;
      width: 100%;
      background: #7d40e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.04, '#7d40e7')};
      }
    }
  }
`;
