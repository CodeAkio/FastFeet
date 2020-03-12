import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import formatDate from '~/utils/formatDate';
import formatId from '~/utils/formatId';
import Background from '~/components/Background';
import Container from '~/components/Container';

import { Title, ProblemsList, Card, Description, Date } from './styles';

export default function ShowProblems({ navigation }) {
  const deliveryId = navigation.getParam('deliveryId');

  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get(`/delivery/${deliveryId}/problems`);

      setProblems(response.data);
    }

    loadDeliveries();
  }, [deliveryId]);

  return (
    <Background>
      <Container>
        <Title>{`Encomenda ${formatId(deliveryId)}`}</Title>
        <ProblemsList
          data={problems}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Card>
              <Description>{item.description}</Description>
              <Date>{formatDate(item.createdAt)}</Date>
            </Card>
          )}
          ListEmptyComponent={() => (
            <Card>
              <Description>Não há problemas para serem exibidos!</Description>
            </Card>
          )}
        />
      </Container>
    </Background>
  );
}

ShowProblems.navigationOptions = ({ navigation }) => ({
  title: 'Visualizar problemas',
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

ShowProblems.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
