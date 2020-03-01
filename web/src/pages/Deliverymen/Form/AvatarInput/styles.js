import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;
  label {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    img {
      height: 150px;
      width: 150px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #eee;
    }
    input {
      display: none;
    }
  }
`;

export const EmpityAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-self: center;
  margin-bottom: 30px;
  height: 150px;
  width: 150px;
  border: 2px dashed #ddd;
  border-radius: 50%;
  background: none;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  > p {
    font-size: 16px;
    color: #ddd;
  }
`;
