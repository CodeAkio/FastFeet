import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MdMoreHoriz, MdVisibility, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import { changeItem } from '~/store/modules/menu/actions';
import api from '~/services/api';
import formattedId from '~/utils/formattedId';
import { Container } from './styles';
import Modal from '~/components/Modal';
import OptionsList from '~/components/OptionsList';
import Alert from '~/components/Alert';

export default function Problems() {
  const dispatch = useDispatch();
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    dispatch(changeItem('PROBLEMAS'));
  });

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('/delivery/problems');

      const data = response.data.map(p => ({
        ...p,
        optionsOpen: false,
        alertOpen: false,
        modalOpen: false,
      }));

      setProblems(data);
    }

    loadProblems();
  }, []);

  function handleToggleVisibleOptions(id) {
    setProblems(
      problems.map(p => {
        if (p.id === id) {
          return { ...p, optionsOpen: !p.optionsOpen };
        }
        return { ...p };
      })
    );
  }

  function handleToggleVisibleAlert(id) {
    setProblems(
      problems.map(p => {
        if (p.id === id) {
          return { ...p, alertOpen: !p.alertOpen };
        }
        return { ...p };
      })
    );
  }

  function handleToggleOpenModal(id) {
    setProblems(
      problems.map(p => {
        if (p.id === id) {
          return { ...p, modalOpen: !p.modalOpen };
        }
        return { ...p };
      })
    );
  }

  async function cancelOrder(id) {
    try {
      await api.delete(`/problem/${id}/cancel-delivery`);
      toast.success(`A encomenda ${formattedId(id)} foi cancelada com sucesso`);
    } catch (err) {
      toast.error(`Não foi possível cancelar a encomenda ${formattedId(id)}`);
    }
  }

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
          <tr key={problem.id}>
            <td>{formattedId(problem.delivery.id)}</td>
            <td>{problem.description}</td>
            <td>
              <button
                type="button"
                onClick={() => handleToggleVisibleOptions(problem.id)}
              >
                <MdMoreHoriz size={24} color="#C6C6C6" />
              </button>
              <OptionsList visible={problem.optionsOpen}>
                <li>
                  <MdVisibility size={14} color="#8E5BE8" />
                  <button
                    type="button"
                    onClick={() => handleToggleOpenModal(problem.id)}
                  >
                    Visualizar
                  </button>
                  <Modal
                    visible={problem.modalOpen}
                    handler={handleToggleOpenModal}
                    handlerParam={problem.id}
                  >
                    <h4>VISUALIZAR PROBLEMA</h4>
                    <p>{problem.description}</p>
                  </Modal>
                </li>
                <li>
                  <MdDeleteForever size={14} color="#DE3B3B" />
                  <button
                    type="button"
                    onClick={() => handleToggleVisibleAlert(problem.id)}
                  >
                    Cancelar encomenda
                  </button>
                  <Alert
                    visible={problem.alertOpen}
                    handler={handleToggleVisibleAlert}
                    handlerParam={problem.id}
                    handlerConfirm={cancelOrder}
                    handlerConfirmParam={problem.delivery.id}
                  >
                    <p>
                      Você realmente deseja cancelar a encomenda{' '}
                      <strong>{formattedId(problem.delivery.id)}</strong>?
                    </p>
                    <p>
                      <strong>Produto: </strong>
                      {problem.delivery.product}
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
