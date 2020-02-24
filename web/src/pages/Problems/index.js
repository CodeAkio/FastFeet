import React from 'react';
import { MdAdd } from 'react-icons/md';

import { Container, HeaderDiv } from './styles';

export default function Problems() {
  return (
    <Container>
      <h1>Problemas na entrega</h1>

      <HeaderDiv>
        <div>
          <i className="fa fa-search" aria-hidden="true" />
          <input
            name="search"
            type="search"
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
        <tr>
          <td>#01</td>
          <td>Ludwig van Beethoven</td>
          <td>Rua Beethoven, 1729, Diadema - São Paulo</td>
          <td>...</td>
        </tr>
        <tr>
          <td>#02</td>
          <td>Wolfgang Amadeus</td>
          <td>Rua Beethoven, 1729, Diadema - São Paulo</td>
          <td>...</td>
        </tr>
        <tr>
          <td>#03</td>
          <td>Johann Sebastian Bach</td>
          <td>Rua Beethoven, 1729, Diadema - São Paulo</td>
          <td>...</td>
        </tr>
        <tr>
          <td>#04</td>
          <td>Frédéric Chopin</td>
          <td>Rua Beethoven, 1729, Diadema - São Paulo</td>
          <td>...</td>
        </tr>
        <tr>
          <td>#05</td>
          <td>Piotr Ilitch Tchaikovski</td>
          <td>Rua Beethoven, 1729, Diadema - São Paulo</td>
          <td>...</td>
        </tr>
        <tr>
          <td>#06</td>
          <td>Antonio Vivaldi</td>
          <td>Rua Beethoven, 1729, Diadema - São Paulo</td>
          <td>...</td>
        </tr>
      </table>
    </Container>
  );
}
