import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import formatDate from '~/utils/formatDate';
import {
  Container,
  Avatar,
  InfoSection,
  InfoGroup,
  Header,
  TextInfo,
  LogoutButton,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const profile = useSelector(state => state.user.profile);

  const avatar = profile.avatar.url;
  const { name, email, createdAt } = profile;
  const formattedDate = formatDate(createdAt);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Avatar source={{ uri: avatar }} />
      <InfoSection>
        <InfoGroup>
          <Header>Nome completo</Header>
          <TextInfo>{name}</TextInfo>
        </InfoGroup>
        <InfoGroup>
          <Header>E-mail</Header>
          <TextInfo>{email}</TextInfo>
        </InfoGroup>
        <InfoGroup>
          <Header>Data de cadastro</Header>
          <TextInfo>{formattedDate}</TextInfo>
        </InfoGroup>
        <LogoutButton loading={loading} onPress={handleLogout}>
          Logout
        </LogoutButton>
      </InfoSection>
    </Container>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="account-circle" size={25} color={tintColor} />
  ),
};
