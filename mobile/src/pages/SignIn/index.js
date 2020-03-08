import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';
import { Container, Logo, Form, FormInput, SubmitButton } from './styles';

import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const [id, setId] = useState();

  function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Container>
        <Logo source={logo} />
        <Form>
          <FormInput
            keyboardType="numeric"
            autoCorrect={false}
            placeholder="Informe seu ID de cadastro"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={id}
            onChangeText={setId}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar no sistema
          </SubmitButton>
        </Form>
      </Container>
    </>
  );
}
