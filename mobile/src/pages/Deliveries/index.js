import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import OrderSteps from './OrderSteps';

// import formatDate from '~/utils/formatDate';
import api from '~/services/api';
import formatId from '~/utils/formatId';
import formatDate from '~/utils/formatDate';
import Container from '~/components/Container';
import {
  Header,
  ProfileView,
  Avatar,
  WelcomeView,
  WelcomeText,
  Name,
  DeliveriesHeader,
  DeliveriesTitle,
  Status,
  StatusItem,
  StatusText,
  DeliveriesList,
  Delivery,
  DeliveryHeader,
  DeliveryTitle,
  DeliveryStatus,
  DeliveryInfo,
  Data,
  DataLabel,
  DataText,
  DataLink,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Deliveries({ navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const [deliveries, setDeliveries] = useState([]);
  const [pending, setPending] = useState(true);
  const [delivered, setDelivered] = useState(false);

  const avatar = profile.avatar.url;
  const { name, id } = profile;
  // const formattedDate = formatDate(createdAt);

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get(`/deliveryman/${id}/deliveries`, {
        params: {
          delivered,
        },
      });

      setDeliveries(response.data);
    }

    loadDeliveries();
  }, [delivered, id]);

  function handleLogout() {
    dispatch(signOut());
  }

  function handleStatus(status) {
    if (status === 'pending') {
      setPending(true);
      setDelivered(false);
    } else {
      setPending(false);
      setDelivered(true);
    }
  }

  function statusPosition(status) {
    switch (status) {
      case 'pendente':
        return 0;
      case 'retirada':
        return 1;
      case 'entregue':
        return 2;
      default:
        return 0;
    }
  }

  return (
    <Container background>
      <Header>
        <ProfileView>
          <Avatar source={{ uri: avatar }} />
          <WelcomeView>
            <WelcomeText>Bem vindo de volta,</WelcomeText>
            <Name>{name}</Name>
          </WelcomeView>
        </ProfileView>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="exit-to-app" size={25} color="#E74040" />
        </TouchableOpacity>
      </Header>
      <DeliveriesHeader>
        <DeliveriesTitle>Entregas</DeliveriesTitle>
        <Status>
          <TouchableOpacity onPress={() => handleStatus('pending')}>
            <StatusItem selected={pending}>
              <StatusText selected={pending}>Pendentes</StatusText>
            </StatusItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleStatus('delivered')}>
            <StatusItem selected={delivered}>
              <StatusText selected={delivered}>Entregues</StatusText>
            </StatusItem>
          </TouchableOpacity>
        </Status>
      </DeliveriesHeader>
      <DeliveriesList
        data={deliveries}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Delivery>
            <DeliveryHeader>
              <Icon name="local-shipping" size={22} color="#7D40E7" />
              <DeliveryTitle>{`Encomenda ${formatId(item.id)}`}</DeliveryTitle>
            </DeliveryHeader>
            <DeliveryStatus>
              <OrderSteps position={statusPosition(item.status)} />
            </DeliveryStatus>
            <DeliveryInfo>
              <Data>
                <DataLabel>Data</DataLabel>
                <DataText>{formatDate(item.createdAt)}</DataText>
              </Data>
              <Data>
                <DataLabel>Cidade</DataLabel>
                <DataText>{item.recipient.city}</DataText>
              </Data>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Details', { delivery: item })
                }
              >
                <DataLink>Ver detalhes</DataLink>
              </TouchableOpacity>
            </DeliveryInfo>
          </Delivery>
        )}
      />
    </Container>
  );
}

Deliveries.navigationOptions = {
  headerShown: false,
};

Deliveries.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
