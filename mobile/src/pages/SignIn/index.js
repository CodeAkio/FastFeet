import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import logo from '~/assets/logo.png';
import { Container, Logo, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const [id, setId] = useState();

  function handleSubmit() {}

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
          <SubmitButton onPress={handleSubmit}>Entrar no sistema</SubmitButton>
        </Form>
      </Container>
    </>
  );
}
