import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/img/logo@1x.svg';

import { Container, Content, MenuItem, Profile, SignOutButton } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const menuItems = useSelector(state => state.menu);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          {menuItems.map(menuItem => (
            <MenuItem key={menuItem.name} selected={menuItem.selected}>
              <Link to={menuItem.path}>{menuItem.name}</Link>
            </MenuItem>
          ))}
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <SignOutButton onClick={handleSignOut}>
                Sair do sistema
              </SignOutButton>
              <Link to="/orders" />
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
