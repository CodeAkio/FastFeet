import React, { useState, useEffect } from 'react';
import {
  MdAdd,
  MdMoreHoriz,
  MdVisibility,
  MdDeleteForever,
} from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import formattedId from '~/utils/formattedId';
import {
  Container,
  HeaderDiv,
  Status,
  DeliverymanData,
  Signature,
} from './styles';
import Modal from '~/components/Modal';
import OptionsList from '~/components/OptionsList';
import Alert from '~/components/Alert';

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadRecepients() {
      const response = await api.get('/orders', {
        params: {
          q: search,
        },
      });

      const data = response.data.map(o => ({
        ...o,
        optionsOpen: false,
        alertOpen: false,
        modalOpen: false,
      }));

      setOrders(data);
    }

    loadRecepients();
  }, [search]);

  function handleToggleVisibleOptions(id) {
    setOrders(
      orders.map(o => {
        if (o.id === id) {
          return { ...o, optionsOpen: !o.optionsOpen };
        }
        return { ...o };
      })
    );
  }

  function handleToggleVisibleAlert(id) {
    setOrders(
      orders.map(o => {
        if (o.id === id) {
          return { ...o, alertOpen: !o.alertOpen };
        }
        return { ...o };
      })
    );
  }

  function handleToggleOpenModal(id) {
    setOrders(
      orders.map(o => {
        if (o.id === id) {
          return { ...o, modalOpen: !o.modalOpen };
        }
        return { ...o };
      })
    );
  }

  async function deleteOrder(id) {
    try {
      await api.delete(`/orders/${id}`);
      toast.success(`A encomenda ${formattedId(id)} foi removida com sucesso`);
    } catch (err) {
      toast.error(`Não foi possível remover a encomenda ${formattedId(id)}`);
    }
  }

  return (
    <Container>
      <h1>Gerenciando encomendas</h1>

      <HeaderDiv>
        <div>
          <i className="fa fa-search" aria-hidden="true" />
          <input
            name="search"
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por encomendas"
          />
        </div>

        <button type="button">
          <MdAdd size={16} color="#fff" /> CADASTRAR
        </button>
      </HeaderDiv>

      <table>
        <tr>
          <th>ID</th>
          <th>Destinatário</th>
          <th>Entregador</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
        {orders.map(order => (
          <tr key={order.id}>
            <td>{formattedId(order.id)}</td>
            <td>{order.recipient.name}</td>
            <td>
              <DeliverymanData>
                <img
                  src={
                    order.deliveryman.avatar.url ||
                    'https://api.adorable.io/avatars/35/abott@adorable.png'
                  }
                  alt={order.deliveryman.name}
                />
                <span>{order.deliveryman.name}</span>
              </DeliverymanData>
            </td>
            <td>{order.recipient.city}</td>
            <td>{order.recipient.state}</td>
            <td>
              <Status status={order.status}>
                <span>{order.status}</span>
              </Status>
            </td>
            <td>
              <button
                type="button"
                onClick={() => handleToggleVisibleOptions(order.id)}
              >
                <MdMoreHoriz size={24} color="#C6C6C6" />
              </button>
              <OptionsList visible={order.optionsOpen}>
                <li>
                  <MdVisibility size={14} color="#8E5BE8" />
                  <button
                    type="button"
                    onClick={() => handleToggleOpenModal(order.id)}
                  >
                    Visualizar
                  </button>
                  <Modal
                    visible={order.modalOpen}
                    handler={handleToggleOpenModal}
                    handlerParam={order.id}
                  >
                    <h4>Informações da encomenda</h4>
                    <p>
                      {order.recipient.street}, {order.recipient.number}
                    </p>
                    <p>
                      {order.recipient.city}, {order.recipient.state}
                    </p>
                    <p>{order.recipient.cep}</p>
                    <hr />
                    <h4>Datas</h4>
                    <p>
                      <strong>Retirada:</strong>
                    </p>
                    <p>
                      <strong>Entrega:</strong>
                    </p>
                    <hr />
                    <h4>Assinatura do destinatário</h4>
                    {order.signature ? (
                      <Signature>
                        <img src={order.signature.url} alt="assinatura" />
                      </Signature>
                    ) : (
                      <p>Sem assinatura</p>
                    )}
                  </Modal>
                </li>
                <li>
                  <MdDeleteForever size={14} color="#DE3B3B" />
                  <button
                    type="button"
                    onClick={() => handleToggleVisibleAlert(order.id)}
                  >
                    Excluir
                  </button>
                  <Alert
                    visible={order.alertOpen}
                    handler={handleToggleVisibleAlert}
                    handlerParam={order.id}
                    handlerConfirm={deleteOrder}
                    handlerConfirmParam={order.id}
                  >
                    <p>
                      Você realmente deseja remover a encomenda{' '}
                      <strong>{formattedId(order.id)}</strong>?
                    </p>
                    <p>
                      <strong>Produto: </strong>
                      {order.product}
                    </p>
                  </Alert>
                </li>
              </OptionsList>
            </td>
          </tr>
        ))}
      </table>
    </Container>
  );
}
