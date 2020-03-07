/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Select from './SelectInput';

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

const schema = Yup.object().shape({
  product: Yup.string().required('O produto é obrigatório'),
  recipient_id: Yup.number('Deve informar um valor numérico')
    .typeError('Deve informar um valor numérico')
    .required('O destinatário é obrigatório'),
  deliveryman_id: Yup.number('Deve informar um valor numérico')
    .typeError('Deve informar um valor numérico')
    .required('O entregador é obrigatório'),
});

export default function OrderForm({ match, history }) {
  const [productField, setProductField] = useState('');
  const [productFieldError, setProductFieldError] = useState('');

  const [recipientField, setRecipientField] = useState({});
  const [recipientFieldError, setRecipientFieldError] = useState('');

  const [deliverymanField, setDeliverymanField] = useState({});
  const [deliverymanFieldError, setDeliverymanFieldError] = useState('');

  const { id } = match.params;
  const formType = id ? 'edit' : 'new';

  useEffect(() => {
    async function loadOrder() {
      const response = await api.get(`/orders/${id}`);

      const { product, recipient, deliveryman } = response.data;
      setRecipientField({ value: recipient.id, label: recipient.name });
      setDeliverymanField({ value: deliveryman.id, label: deliveryman.name });
      setProductField(product);
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

  function resetErrors() {
    setRecipientFieldError(null);
    setDeliverymanFieldError(null);
    setProductFieldError(null);
  }

  async function validateFields(data) {
    resetErrors();

    let isValid = true;

    await schema
      .validate({
        recipient_id: data.recipient_id,
        deliveryman_id: data.deliveryman_id,
        product: data.product,
      })
      .catch(err => {
        switch (err.path) {
          case 'recipient_id':
            setRecipientFieldError(err.message);
            isValid = false;
            break;
          case 'deliveryman_id':
            setDeliverymanFieldError(err.message);
            isValid = false;
            break;
          case 'product':
            setProductFieldError(err.message);
            isValid = false;
            break;
          default:
            break;
        }
      });
    return isValid;
  }

  async function handleSubmit(e, data) {
    e.preventDefault();

    if (!(await validateFields(data))) return;

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
      <form>
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
            <SaveButton
              onClick={e =>
                handleSubmit(e, {
                  product: productField,
                  recipient_id: recipientField.value,
                  deliveryman_id: deliverymanField.value,
                })
              }
            >
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
                value={recipientField}
                onChange={setRecipientField}
              />
              <span>{recipientFieldError}</span>
            </SelectContainer>
            <SelectContainer size={411} rightSpace>
              <Select
                apiPath="deliverymen"
                value={deliverymanField}
                onChange={setDeliverymanField}
              />
              <span>{deliverymanFieldError}</span>
            </SelectContainer>
          </RowFields>
          <RowFields>
            <FieldContainer>
              <label htmlFor="product">Nome do produto</label>
              <input
                name="product"
                type="text"
                value={productField}
                onChange={e => setProductField(e.target.value)}
              />
              <span>{productFieldError}</span>
            </FieldContainer>
          </RowFields>
        </FormContent>
      </form>
    </Container>
  );
}

OrderForm.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};
