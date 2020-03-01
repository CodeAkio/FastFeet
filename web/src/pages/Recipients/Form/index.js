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

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  street: Yup.string().required('O nome da rua é obrigatório'),
  number: Yup.number('Deve informar um valor numérico')
    .typeError('Deve informar um valor numérico')
    .required('O número é obrigatório'),
  complement: Yup.string().required('O complemento é obrigatório'),
  state: Yup.string().required('O estado é obrigatório'),
  city: Yup.string().required('A cidade é obrigatória'),
  cep: Yup.string()
    .required('O CEP é obrigatório')
    .min(8, 'O CEP deve ter no mínimo 8 caracteres')
    .max(9, 'O CEP deve ter no máximo 9 caracteres'),
});

export default function RecipientForm({ match, history }) {
  const [recipient, setRecipient] = useState(null);

  const { id } = match.params;
  const formType = id ? 'edit' : 'new';

  useEffect(() => {
    async function loadRecepient() {
      const response = await api.get(`/recipients/${id}`);

      setRecipient(response.data);
    }

    loadRecepient();
  }, [id]);

  async function createRecipient(data) {
    try {
      await api.post('/recipients', data);
      toast.success('O destinatário foi criado com sucesso');
      history.push('/recipients');
    } catch (err) {
      toast.error('Não foi possível criar o destinatário');
    }
  }

  async function editRecipient(data) {
    try {
      await api.put(`/recipients/${id}`, data);
      toast.success('O destinatário foi editado com sucesso');
      history.push('/recipients');
    } catch (err) {
      toast.error('Não foi possível editar o destinatário');
    }
  }

  function handleSubmit(data) {
    switch (formType) {
      case 'new':
        createRecipient(data);
        break;
      case 'edit':
        editRecipient(data);
        break;
      default:
        break;
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={recipient} onSubmit={handleSubmit}>
        <HeaderDiv>
          <h1>{formType === 'new' ? 'Cadastro' : 'Edição'} de destinatário</h1>
          <RightContentHeaderDiv>
            <Link to="/recipients">
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
              <label htmlFor="name">Nome</label>
              <Input name="name" type="text" />
            </FieldContainer>
          </RowFields>
          <RowFields>
            <FieldContainer size={520} rightSpace>
              <label htmlFor="street">Rua</label>
              <Input name="street" type="text" />
            </FieldContainer>
            <FieldContainer size={150} rightSpace>
              <label htmlFor="number">Número</label>
              <Input name="number" type="text" />
            </FieldContainer>
            <FieldContainer size={140}>
              <label htmlFor="complement">Complemento</label>
              <Input name="complement" type="text" />
            </FieldContainer>
          </RowFields>
          <RowFields>
            <FieldContainer size={270} rightSpace>
              <label htmlFor="city">Cidade</label>
              <Input name="city" type="text" />
            </FieldContainer>
            <FieldContainer size={270} rightSpace>
              <label htmlFor="state">Estado</label>
              <Input name="state" type="text" />
            </FieldContainer>
            <FieldContainer size={270}>
              <label htmlFor="cep">CEP</label>
              <Input name="cep" type="text" />
            </FieldContainer>
          </RowFields>
        </FormContent>
      </Form>
    </Container>
  );
}

RecipientForm.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};
