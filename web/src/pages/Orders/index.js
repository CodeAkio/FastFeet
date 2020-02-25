import React, { useState, useEffect } from 'react';
import { MdAdd, MdMoreHoriz } from 'react-icons/md';

import api from '~/services/api';
import formattedId from '~/utils/formattedId';
import { Container, HeaderDiv, Status } from './styles';

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

      setOrders(response.data);
    }

    loadRecepients();
  }, [orders, search]);

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
          <tr>
            <td>{formattedId(order.id)}</td>
            <td>{order.recipient.name}</td>
            <td>
              <div>
                <img
                  src={
                    order.deliveryman.avatar.url ||
                    'https://api.adorable.io/avatars/35/abott@adorable.png'
                  }
                  alt={order.deliveryman.name}
                />
                <span>{order.deliveryman.name}</span>
              </div>
            </td>
            <td>{order.recipient.city}</td>
            <td>{order.recipient.state}</td>
            <td>
              <Status status={order.status}>
                <span>{order.status}</span>
              </Status>
            </td>
            <td>
              <MdMoreHoriz size={24} color="#C6C6C6" />
            </td>
          </tr>
        ))}
      </table>
    </Container>
  );
}
