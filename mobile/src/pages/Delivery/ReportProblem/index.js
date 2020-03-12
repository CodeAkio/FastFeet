import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import Background from '~/components/Background';
import Container from '~/components/Container';
import { Scroll } from '~/components/Scroll';
import { SubmitButton } from './styles';

import Input from './Input';

export default function ReportProblem({ navigation }) {
  const deliveryId = navigation.getParam('deliveryId');

  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      const response = await api.post(`/delivery/${deliveryId}/problems`, {
        description,
      });

      if (response.status === 400) throw new Error('Problem not registered');

      setDescription('');
      setLoading(false);

      Alert.alert('Sucesso', 'Problema registrado com sucesso');
    } catch (err) {
      setLoading(false);

      Alert.alert(
        'Falha na criação',
        'Houve uma falha ao registrar o problema, verifique seus dados'
      );
    }
  }

  return (
    <Background>
      <Container>
        <Scroll>
          <Input
            autoCorrect={false}
            placeholder="Inclua aqui o problema que ocorreu na entrega."
            multiline
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={description}
            onChangeText={setDescription}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Enviar
          </SubmitButton>
        </Scroll>
      </Container>
    </Background>
  );
}

ReportProblem.navigationOptions = ({ navigation }) => ({
  title: 'Informar problema',
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

ReportProblem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
