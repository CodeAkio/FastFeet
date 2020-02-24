import React, { useState, useEffect } from 'react';
import { MdAdd, MdMoreHoriz } from 'react-icons/md';

import api from '~/services/api';
import formattedId from '~/utils/formattedId';
import { Container, HeaderDiv } from './styles';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadRecepients() {
      const response = await api.get('/recipients', {
        params: {
          q: search,
        },
      });

      setRecipients(response.data);
    }

    loadRecepients();
  }, [recipients, search]);

  return (
    <Container>
      <h1>Gerenciando destinatários</h1>

      <HeaderDiv>
        <div>
          <i className="fa fa-search" aria-hidden="true" />
          <input
            name="search"
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por destinatários"
          />
        </div>

        <button type="button">
          <MdAdd size={16} color="#fff" /> CADASTRAR
        </button>
      </HeaderDiv>

      <table>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Endereço</th>
          <th>Ações</th>
        </tr>
        {recipients.map(recipient => (
          <tr>
            <td>{formattedId(recipient.id)}</td>
            <td>{recipient.name}</td>
            <td>{`${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state}`}</td>
            <td>
              <MdMoreHoriz size={24} color="#C6C6C6" />
            </td>
          </tr>
        ))}
      </table>
    </Container>
  );
}
