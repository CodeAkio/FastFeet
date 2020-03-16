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
import { Container, HeaderDiv, Avatar } from './styles';
import OptionsList from '~/components/OptionsList';
import Alert from '~/components/Alert';

export default function Deliverymen() {
  const dispatch = useDispatch();

  const [deliverymen, setDeliverymen] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(changeItem('ENTREGADORES'));
  });

  useEffect(() => {
    async function loadDeliverymen() {
      const response = await api.get('/deliverymen', {
        params: {
          q: search,
        },
      });

      const data = response.data.map(d => ({
        ...d,
        optionsOpen: false,
        alertOpen: false,
      }));

      setDeliverymen(data);
    }

    loadDeliverymen();
  }, [search]);

  function handleToggleVisibleOptions(id) {
    setDeliverymen(
      deliverymen.map(d => {
        if (d.id === id) {
          return { ...d, optionsOpen: !d.optionsOpen };
        }
        return { ...d };
      })
    );
  }

  function handleToggleVisibleAlert(id) {
    setDeliverymen(
      deliverymen.map(d => {
        if (d.id === id) {
          return { ...d, alertOpen: !d.alertOpen };
        }
        return { ...d };
      })
    );
  }

  async function deleteDeliveryman(id) {
    try {
      await api.delete(`/deliverymen/${id}`);
      toast.success(`O entregador ${formattedId(id)} foi removido com sucesso`);
    } catch (err) {
      toast.error(`Não foi possível remover o entregador ${formattedId(id)}`);
    }
  }

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

        <Link to="deliverymen/new">
          <button type="button">
            <MdAdd size={16} color="#fff" /> CADASTRAR
          </button>
        </Link>
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
          <tr key={deliveryman.id}>
            <td>{formattedId(deliveryman.id)}</td>
            <td>
              <Avatar
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
              <button
                type="button"
                onClick={() => handleToggleVisibleOptions(deliveryman.id)}
              >
                <MdMoreHoriz size={24} color="#C6C6C6" />
              </button>
              <OptionsList visible={deliveryman.optionsOpen}>
                <li>
                  <MdModeEdit size={14} color="#4D85EE" />
                  <Link to={`deliverymen/${deliveryman.id}/edit`}>Editar</Link>
                </li>
                <li>
                  <MdDeleteForever size={14} color="#DE3B3B" />
                  <button
                    type="button"
                    onClick={() => handleToggleVisibleAlert(deliveryman.id)}
                  >
                    Excluir
                  </button>
                  <Alert
                    visible={deliveryman.alertOpen}
                    handler={handleToggleVisibleAlert}
                    handlerParam={deliveryman.id}
                    handlerConfirm={deleteDeliveryman}
                    handlerConfirmParam={deliveryman.id}
                  >
                    <p>
                      Você realmente deseja remover o entregador{' '}
                      <strong>
                        {deliveryman.name} ({formattedId(deliveryman.id)})
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
