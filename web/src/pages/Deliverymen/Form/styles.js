import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 36px auto;
`;

export const HeaderDiv = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RightContentHeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SaveButton = styled.button.attrs({
  type: 'submit',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  background: #7d40e7;
  border: 0;
  border-radius: 4px;
  padding: 8px 16px;
  margin-left: 16px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;

export const BackButton = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  background: #ccc;
  border: 0;
  border-radius: 4px;
  padding: 8px 16px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;

export const IconContainer = styled.span`
  margin-right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 30px;
  background: #fff;
  border-radius: 4px;
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
`;

export const RowFields = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => (props.size ? `${props.size}px` : '100%')};
  margin-left: ${props => (props.leftSpace ? '16px' : 0)};
  margin-right: ${props => (props.rightSpace ? '16px' : 0)};
`;
