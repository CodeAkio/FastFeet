import React, { useState, useEffect } from 'react';
import { MdMoreHoriz } from 'react-icons/md';

import api from '~/services/api';
import formattedId from '~/utils/formattedId';
import { Container } from './styles';

export default function Problems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadRecepients() {
      const response = await api.get('/delivery/problems');

      setProblems(response.data);
    }

    loadRecepients();
  }, [problems]);

  return (
    <Container>
      <h1>Problemas na entrega</h1>

      <table>
        <tr>
          <th>Encomenda</th>
          <th>Problema</th>
          <th>Ações</th>
        </tr>
        {problems.map(problem => (
          <tr>
            <td>{formattedId(problem.delivery.id)}</td>
            <td>{problem.description}</td>
            <td>
              <MdMoreHoriz size={24} color="#C6C6C6" />
            </td>
          </tr>
        ))}
      </table>
    </Container>
  );
}
