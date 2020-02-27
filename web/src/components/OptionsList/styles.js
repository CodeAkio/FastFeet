import styled from 'styled-components';

export const Container = styled.div`
  z-index: 1;
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
