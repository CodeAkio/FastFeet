/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
// import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import Select from './SelectInput';
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
  SelectContainer,
} from './styles';

// const schema = Yup.object().shape({
//   product: Yup.string().required('O produto é obrigatório'),
//   recipient_id: Yup.number('Deve informar um valor numérico')
//     .typeError('Deve informar um valor numérico')
//     .required('O destinatário é obrigatório'),
//   deliveryman_id: Yup.number('Deve informar um valor numérico')
//     .typeError('Deve informar um valor numérico')
//     .required('O entregador é obrigatório'),
// });

export default function OrderForm({ match, history }) {
  const [order, setOrder] = useState(null);

  const { id } = match.params;
  const formType = id ? 'edit' : 'new';

  useEffect(() => {
    async function loadOrder() {
      const response = await api.get(`/orders/${id}`);

      setOrder(response.data);
    }

    loadOrder();
  }, [id]);

  async function createOrder(data) {
    try {
      await api.post('/orders', data);
      toast.success('A encomenda foi criada com sucesso');
      history.push('/orders');
    } catch (err) {
      toast.error('Não foi possível criar a encomenda');
    }
  }

  async function editOrder(data) {
    try {
      await api.put(`/orders/${id}`, data);
      toast.success('A encomenda foi editada com sucesso');
      history.push('/orders');
    } catch (err) {
      toast.error('Não foi possível editar a encomenda');
    }
  }

  function handleSubmit(data) {
    switch (formType) {
      case 'new':
        createOrder(data);
        break;
      case 'edit':
        editOrder(data);
        break;
      default:
        break;
    }
  }

  return (
    <Container>
      <Form initialData={order} onSubmit={handleSubmit}>
        <HeaderDiv>
          <h1>{formType === 'new' ? 'Cadastro' : 'Edição'} de destinatário</h1>
          <RightContentHeaderDiv>
            <Link to="/orders">
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
            <SelectContainer size={411} rightSpace>
              <Select
                apiPath="recipients"
                initialValue={order && order.recipient.id}
              />
            </SelectContainer>
            <SelectContainer size={411}>
              <Select
                apiPath="deliverymen"
                initialValue={order && order.deliveryman.id}
              />
            </SelectContainer>
          </RowFields>
          <RowFields>
            <FieldContainer>
              <label htmlFor="product">Nome do produto</label>
              <Input name="product" type="text" />
            </FieldContainer>
          </RowFields>
        </FormContent>
      </Form>
    </Container>
  );
}

OrderForm.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};
