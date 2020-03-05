/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
// import * as Yup from 'yup';
import AsyncSelect from 'react-select/async';
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
  const [defaultRecipient, setDefaultRecipient] = useState(null);
  const [defaultDeliveryman, setDefaultDeliveryman] = useState(null);
  const [recipients, setRecipients] = useState({});
  const [deliverymen, setDeliverymen] = useState({});

  const { id } = match.params;
  const formType = id ? 'edit' : 'new';

  useEffect(() => {
    async function loadOrder() {
      const response = await api.get(`/orders/${id}`);

      setOrder(response.data);

      const { recipient, deliveryman } = response.data;
      console.log(deliveryman);
      setDefaultRecipient({ value: recipient.id, label: recipient.name });
      setDefaultDeliveryman({ value: deliveryman.id, label: deliveryman.name });
    }

    async function loadRecipients() {
      const response = await api.get('/recipients');

      const data = response.data.map(r => ({
        value: r.id,
        label: r.name,
      }));

      setRecipients(data);
    }

    async function loadDeliverymen() {
      const response = await api.get('/deliverymen');

      const data = response.data.map(d => ({
        value: d.id,
        label: d.name,
      }));

      setDeliverymen(data);
    }

    loadOrder();
    loadRecipients();
    loadDeliverymen();
  }, [id]);

  function filterRecipients(inputValue) {
    return recipients.filter(e =>
      e.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  function filterDeliverymen(inputValue) {
    return deliverymen.filter(e =>
      e.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  const promiseRecipients = inputValue =>
    new Promise(resolve => {
      resolve(filterRecipients(inputValue));
    });

  const promiseDeliverymen = inputValue =>
    new Promise(resolve => {
      resolve(filterDeliverymen(inputValue));
    });

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
              <AsyncSelect
                cacheOptions
                defaultOptions={recipients}
                loadOptions={promiseRecipients}
                options={recipients}
                value={defaultRecipient}
                onChange={setDefaultRecipient}
              />
            </SelectContainer>
            <SelectContainer size={411}>
              <AsyncSelect
                cacheOptions
                defaultOptions={deliverymen}
                loadOptions={promiseDeliverymen}
                options={deliverymen}
                value={defaultDeliveryman}
                onChange={setDefaultDeliveryman}
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
