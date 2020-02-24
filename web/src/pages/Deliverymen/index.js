import React, { useState, useEffect } from 'react';
import { MdAdd, MdMoreHoriz } from 'react-icons/md';

import api from '~/services/api';
import formattedId from '~/utils/formattedId';
import { Container, HeaderDiv } from './styles';

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadRecepients() {
      const response = await api.get('/deliverymen', {
        params: {
          q: search,
        },
      });

      setDeliverymen(response.data);
    }

    loadRecepients();
  }, [deliverymen, search]);

  return (
    <Container>
      <h1>Gerenciando entregadores</h1>

      <HeaderDiv>
        <div>
          <i className="fa fa-search" aria-hidden="true" />
          <input
            name="search"
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por entregadores"
          />
        </div>

        <button type="button">
          <MdAdd size={16} color="#fff" /> CADASTRAR
        </button>
      </HeaderDiv>

      <table>
        <tr>
          <th>ID</th>
          <th>Foto</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Ações</th>
        </tr>
        {deliverymen.map(deliveryman => (
          <tr>
            <td>{formattedId(deliveryman.id)}</td>
            <td>
              <img
                src={
                  deliveryman.avatar.url ||
                  'https://api.adorable.io/avatars/35/abott@adorable.png'
                }
                alt={deliveryman.name}
              />
            </td>
            <td>{deliveryman.name}</td>
            <td>{deliveryman.email}</td>
            <td>
              <MdMoreHoriz size={24} color="#C6C6C6" />
            </td>
          </tr>
        ))}
      </table>
    </Container>
  );
}
