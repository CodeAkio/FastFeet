import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity, Alert } from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import formatId from '~/utils/formatId';
import Background from '~/components/Background';
import Container from '~/components/Container';
import { Scroll } from '~/components/Scroll';
import {
  PictureContainer,
  Picture,
  Camera,
  TakePicButton,
  SubmitButton,
} from './styles';

export default function Confirm({ navigation }) {
  const deliverymanId = useSelector(state => state.user.profile.id);
  const deliveryId = navigation.getParam('deliveryId');

  const [picture, setPicture] = useState({});
  const [cameraOn, setCameraOn] = useState(true);
  const [loading, setLoading] = useState(false);

  const camera = useRef(null);

  async function takePicture() {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.current.takePictureAsync(options);
      setPicture(data);
      setCameraOn(false);
    }
  }

  async function discardPicture() {
    setPicture({});
    setCameraOn(true);
  }

  async function handleSubmit() {
    if (cameraOn) {
      Alert.alert('Falha', 'É obrigatório ter uma imagem');
      return;
    }

    setLoading(true);

    try {
      const formFile = new FormData();

      formFile.append('file', {
        uri: picture.uri,
        type: 'image/jpeg',
        name: `signature_${formatId(deliverymanId)}_${formatId(
          deliveryId
        )}.jpg`,
      });

      const response = await api.post('files', formFile);
      const signature_id = response.data.id;

      await api.put(`deliveryman/${deliverymanId}/deliveries/${deliveryId}`, {
        signature_id,
        end_date: new Date(),
      });

      setLoading(false);
      navigation.navigate('Deliveries');
    } catch (err) {
      setLoading(false);
      Alert.alert('Falha', 'Houve uma falha ao confirmar a entrega');
    }
  }

  return (
    <Background>
      <Container>
        <Scroll>
          {cameraOn ? (
            <PictureContainer>
              <Camera
                ref={camera}
                type={Camera.Constants.Type.back}
                autoFocus={Camera.Constants.AutoFocus.on}
                flashMode={Camera.Constants.FlashMode.off}
              />
              <TakePicButton onPress={takePicture}>
                <Icon name="camera-alt" size={33} color="#fff" />
              </TakePicButton>
            </PictureContainer>
          ) : (
            <PictureContainer>
              <Picture source={{ uri: picture.uri }} />
              <TakePicButton onPress={discardPicture}>
                <Icon name="cancel" size={33} color="#fff" />
              </TakePicButton>
            </PictureContainer>
          )}
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Enviar
          </SubmitButton>
        </Scroll>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar entrega',
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

Confirm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
