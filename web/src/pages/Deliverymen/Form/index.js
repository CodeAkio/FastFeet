/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import {
  Container,
  HeaderDiv,
  RightContentHeaderDiv,
  SaveButton,
  BackButton,
  IconContainer,
  FormContent,
  RowFields,
  FieldContainer,
} from './styles';
import AvatarInput from './AvatarInput';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Precisa seguir o padrão de endereço de e-mail')
    .required('O e-mail é obrigatório'),
  avatar_id: Yup.number('Deve ser um número').required(
    'O avatar é obrigatório'
  ),
});

export default function DeliverymanForm({ match, history }) {
  const [deliveryman, setDeliveryman] = useState(null);

  const { id } = match.params;
  const formType = id ? 'edit' : 'new';

  useEffect(() => {
    async function loadDeliveryman() {
      const response = await api.get(`/deliverymen/${id}`);

      setDeliveryman(response.data);
    }

    loadDeliveryman();
  }, [id]);

  async function createDeliveryman(data) {
    try {
      await api.post('/deliverymen', data);
      toast.success('O entregador foi criado com sucesso');
      history.push('/deliverymen');
    } catch (err) {
      toast.error('Não foi possível criar o entregador');
    }
  }

  async function editDeliveryman(data) {
    try {
      await api.put(`/deliverymen/${id}`, data);
      toast.success('O entregador foi editado com sucesso');
      history.push('/deliverymen');
    } catch (err) {
      toast.error('Não foi possível editar o entregador');
    }
  }

  function handleSubmit(data) {
    switch (formType) {
      case 'new':
        createDeliveryman(data);
        break;
      case 'edit':
        editDeliveryman(data);
        break;
      default:
        break;
    }
  }

  return (
    <Container>
      {console.tron.log('form: ', deliveryman)}
      <Form schema={schema} initialData={deliveryman} onSubmit={handleSubmit}>
        <HeaderDiv>
          <h1>{formType === 'new' ? 'Cadastro' : 'Edição'} de entregadores</h1>
          <RightContentHeaderDiv>
            <Link to="/deliverymen">
              <BackButton>
                <IconContainer>
                  <MdKeyboardArrowLeft size={20} color="#fff" />
                </IconContainer>
                VOLTAR
              </BackButton>
            </Link>
            <SaveButton>
              <IconContainer>
                <MdCheck size={20} color="#fff" />
              </IconContainer>
              SALVAR
            </SaveButton>
          </RightContentHeaderDiv>
        </HeaderDiv>
        <FormContent>
          <RowFields>
            <FieldContainer>
              <AvatarInput name="avatar_id" />
            </FieldContainer>
          </RowFields>
          <RowFields>
            <FieldContainer>
              <label htmlFor="name">Nome</label>
              <Input name="name" id="name" type="text" />
            </FieldContainer>
          </RowFields>
          <RowFields>
            <FieldContainer>
              <label htmlFor="email">E-mail</label>
              <Input name="email" id="email" type="text" />
            </FieldContainer>
          </RowFields>
        </FormContent>
      </Form>
    </Container>
  );
}

DeliverymanForm.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};
