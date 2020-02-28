import styled from 'styled-components';

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
