import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/img/logo@1x.svg';

import { Container, Content, MenuItem, Profile, SignOutButton } from './styles';

export default function Header() {
  const [menuItems, setMenuItems] = useState([
    {
      name: 'ENCOMENDAS',
      path: '/orders',
      selected: true,
    },
    {
      name: 'ENTREGADORES',
      path: '/deliverymen',
      selected: false,
    },
    {
      name: 'DESTINATÁRIOS',
      path: '/recipients',
      selected: false,
    },
    {
      name: 'PROBLEMAS',
      path: '/problems',
      selected: false,
    },
  ]);

  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  function handlePage(itemName) {
    setMenuItems(
      menuItems.map(item => {
        if (item.name === itemName) {
          item.selected = true;
        } else {
          item.selected = false;
        }

        return { ...item };
      })
    );
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          {menuItems.map(menuItem => (
            <MenuItem key={menuItem.name} selected={menuItem.selected}>
              <Link
                to={menuItem.path}
                onClick={() => handlePage(menuItem.name)}
              >
                {menuItem.name}
              </Link>
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
