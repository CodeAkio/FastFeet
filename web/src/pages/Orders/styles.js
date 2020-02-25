import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1200px;
  margin: 36px auto;

  table {
    td {
      div {
        display: flex;
        align-items: center;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
        span {
          margin-left: 10px;
        }
      }
    }
    td:first-child {
      width: auto;
    }
    td:nth-child(2) {
      width: auto;
    }
    td:nth-child(3) {
      width: auto;
    }
    td:nth-child(4) {
      width: auto;
    }
    td:nth-child(5) {
      width: auto;
    }
    td:nth-child(6) {
      width: auto;
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

const handleColorStatus = status => {
  switch (status) {
    case 'pendente':
      return css`
        & {
          background: #f0f0df;
          > span {
            color: #c1bc35;
          }
        }
        &::before {
          background: #c1bc35;
        }
      `;
    case 'retirada':
      return css`
        & {
          background: #bad2ff;
          > span {
            color: #4d85ee;
          }
        }
        &::before {
          background: #4d85ee;
        }
      `;
    case 'entregue':
      return css`
        & {
          background: #dff0df;
          > span {
            color: #2ca42b;
          }
        }
        &::before {
          background: #2ca42b;
        }
      `;
    case 'cancelado':
      return css`
        & {
          background: #fab0b0;
          > span {
            color: #de3b3b;
          }
        }
        &::before {
          background: #de3b3b;
        }
      `;
    default:
      return 'background: none;';
  }
};

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

export const Status = styled.div`
  display: flex;
  padding: 4px 8px;
  border-radius: 50px;
  max-width: 7.6em;
  align-items: center;
  justify-content: center;
  ${({ status }) => handleColorStatus(status)}
  span {
    font-weight: bold;
    font-size: 14px;
    text-transform: uppercase;
  }
  &::before {
    content: '';
    height: 10px;
    width: 10px;
    border-radius: 50%;
  }
`;
