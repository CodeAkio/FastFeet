import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  MdAdd,
  MdMoreHoriz,
  MdDeleteForever,
  MdModeEdit,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { changeItem } from '~/store/modules/menu/actions';
import api from '~/services/api';
import formattedId from '~/utils/formattedId';
import { Container, HeaderDiv } from './styles';
import OptionsList from '~/components/OptionsList';
import Alert from '~/components/Alert';

export default function Recipients() {
  const dispatch = useDispatch();
  const [recipients, setRecipients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(changeItem('DESTINATÁRIOS'));
  });

  useEffect(() => {
    async function loadRecepients() {
      const response = await api.get('/recipients', {
        params: {
          q: search,
        },
      });

      const data = response.data.map(r => ({
        ...r,
        optionsOpen: false,
        alertOpen: false,
      }));

      setRecipients(data);
    }

    loadRecepients();
  }, [search]);

  function handleToggleVisibleOptions(id) {
    setRecipients(
      recipients.map(r => {
        if (r.id === id) {
          return { ...r, optionsOpen: !r.optionsOpen };
        }
        return { ...r };
      })
    );
  }

  function handleToggleVisibleAlert(id) {
    setRecipients(
      recipients.map(r => {
        if (r.id === id) {
          return { ...r, alertOpen: !r.alertOpen };
        }
        return { ...r };
      })
    );
  }

  async function deleteRecipient(id) {
    try {
      await api.delete(`/recipients/${id}`);
      toast.success(
        `O destinatário ${formattedId(id)} foi removido com sucesso`
      );
    } catch (err) {
      toast.error(`Não foi possível remover o destinatário ${formattedId(id)}`);
    }
  }

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

        <Link to="recipients/new">
          <button type="button">
            <MdAdd size={16} color="#fff" /> CADASTRAR
          </button>
        </Link>
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
              <button
                type="button"
                onClick={() => handleToggleVisibleOptions(recipient.id)}
              >
                <MdMoreHoriz size={24} color="#C6C6C6" />
              </button>
              <OptionsList visible={recipient.optionsOpen}>
                <li>
                  <MdModeEdit size={14} color="#4D85EE" />
                  <Link to={`recipients/${recipient.id}/edit`}>Editar</Link>
                </li>
                <li>
                  <MdDeleteForever size={14} color="#DE3B3B" />
                  <button
                    type="button"
                    onClick={() => handleToggleVisibleAlert(recipient.id)}
                  >
                    Excluir
                  </button>
                  <Alert
                    visible={recipient.alertOpen}
                    handler={handleToggleVisibleAlert}
                    handlerParam={recipient.id}
                    handlerConfirm={deleteRecipient}
                    handlerConfirmParam={recipient.id}
                  >
                    <p>
                      Você realmente deseja remover o destinatário{' '}
                      <strong>
                        {recipient.name} ({formattedId(recipient.id)})
                      </strong>
                      ?
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
