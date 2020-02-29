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
    td:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    td:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
`;
