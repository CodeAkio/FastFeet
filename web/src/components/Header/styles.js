import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  nav {
    display: flex;
    align-items: center;
    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }
  }
  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;
  div {
    text-align: right;
    margin-right: 10px;
    strong {
      display: block;
      color: #666;
    }
  }
`;

export const SignOutButton = styled.button`
  border: 0;
  background: none;
  padding-top: 5px;
  color: #de3b3b;
  font-size: 14px;
`;

export const MenuItem = styled.div`
  a {
    font-size: 15px;
    font-weight: bold;
    color: ${props => (props.selected ? '#444' : '#999')};
    padding: 0 10px;
  }
`;
