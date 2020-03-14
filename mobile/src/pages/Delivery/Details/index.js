import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import formatDate from '~/utils/formatDate';
import Background from '~/components/Background';
import { Scroll } from '~/components/Scroll';
import Container from '~/components/Container';
import {
  Card,
  CardHeader,
  CardHeaderIcon,
  CardHeaderTitle,
  Data,
  DataRow,
  DataTitle,
  DataText,
  CardAction,
  ActionCenter,
  ActionButton,
  ActionText,
} from './styles';

function Details({ navigation, isFocused }) {
  const deliverymanId = useSelector(state => state.user.profile.id);
  const deliveryId = navigation.getParam('deliveryId');

  const [delivery, setDelivery] = useState({});
  const [recipient, setRecipient] = useState({});

  async function loadDelivery() {
    const response = await api.get(
      `/deliveryman/${deliverymanId}/deliveries/${deliveryId}`
    );

    setDelivery(response.data);
    setRecipient(response.data.recipient);
  }

  useEffect(() => {
    if (isFocused) {
      loadDelivery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  async function withdrawOrder() {
    try {
      await api.put(`/deliveryman/${deliverymanId}/deliveries/${delivery.id}`, {
        start_date: new Date(),
      });

      loadDelivery();

      Alert.alert('Sucesso', 'Entrega retirada com sucesso');
    } catch (err) {
      console.tron.log(err);
      Alert.alert(
        'Falha',
        'Houve uma falha ao registrar o problema, verifique seus'
      );
    }
  }

  function handleWithdrawOrder() {
    Alert.alert(
      'Confirmação',
      'Deseja realizar a retirada desta encomenda?',
      [
        {
          text: 'Sim',
          onPress: withdrawOrder,
        },
        {
          text: 'Não',
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <Background>
      <Container>
        <Scroll>
          <Card>
            <CardHeader>
              <CardHeaderIcon name="local-shipping" />
              <CardHeaderTitle>Informações da entrega</CardHeaderTitle>
            </CardHeader>
            <Data>
              <DataTitle>DESTINATÁRIO</DataTitle>
              <DataText>{recipient.name}</DataText>
            </Data>
            <Data>
              <DataTitle>ENDEREÇO DE ENTREGA</DataTitle>
              <DataText>{`${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state}, ${recipient.cep}`}</DataText>
            </Data>
            <Data last>
              <DataTitle>PRODUTO</DataTitle>
              <DataText>{delivery.product}</DataText>
            </Data>
          </Card>
          <Card>
            <CardHeader>
              <CardHeaderIcon name="event" />
              <CardHeaderTitle>Situação da entrega</CardHeaderTitle>
            </CardHeader>
            <Data>
              <DataTitle>STATUS</DataTitle>
              <DataText>{delivery.status}</DataText>
            </Data>
            <DataRow>
              <Data last>
                <DataTitle>DATA DE RETIRADA</DataTitle>
                <DataText>{formatDate(delivery.start_date)}</DataText>
              </Data>
              <Data last>
                <DataTitle>DATA DE ENTREGA</DataTitle>
                <DataText>{formatDate(delivery.end_date)}</DataText>
              </Data>
            </DataRow>
          </Card>
          {delivery.status === 'pendente' ? (
            <CardAction>
              <ActionButton onPress={handleWithdrawOrder}>
                <Icon name="alarm-on" size={24} color="#7D40E7" />
                <ActionText>Retirar{'\n'}Encomenda</ActionText>
              </ActionButton>
            </CardAction>
          ) : (
            <CardAction>
              <ActionButton
                onPress={() =>
                  navigation.navigate('ReportProblem', {
                    deliveryId: delivery.id,
                  })
                }
              >
                <Icon name="highlight-off" size={24} color="#E74040" />
                <ActionText>Informar{'\n'}Problema</ActionText>
              </ActionButton>
              <ActionCenter>
                <ActionButton
                  onPress={() =>
                    navigation.navigate('ShowProblems', {
                      deliveryId: delivery.id,
                    })
                  }
                >
                  <Icon name="info-outline" size={24} color="#E7BA40" />
                  <ActionText>Visualizar{'\n'}Problemas</ActionText>
                </ActionButton>
              </ActionCenter>
              <ActionButton onPress={() => {}}>
                <Icon name="alarm-on" size={24} color="#7D40E7" />
                <ActionText>Confirmar{'\n'}Entrega</ActionText>
              </ActionButton>
            </CardAction>
          )}
        </Scroll>
      </Container>
    </Background>
  );
}

Details.navigationOptions = ({ navigation }) => ({
  title: 'Detalhes da encomenda',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={25} color="#fff" />
    </TouchableOpacity>
  ),
});

Details.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Details);
