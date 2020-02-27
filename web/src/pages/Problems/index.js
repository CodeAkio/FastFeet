import React, { useRef, useState, useEffect } from 'react';
import { MdMoreHoriz, MdVisibility, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import formattedId from '~/utils/formattedId';
import {
  Container,
  OptionsList,
  CancellationAlert,
  CancellationAlertContent,
  ConfirmButton,
  CancelButton,
} from './styles';
import Modal from '~/components/Modal';

export default function Problems() {
  const [problems, setProblems] = useState([]);

  const alertContentRef = useRef(null);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('/delivery/problems');

      const data = response.data.map(p => ({
        ...p,
        visibleOptions: false,
        visibleAlert: false,
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
          return { ...p, visibleOptions: !p.visibleOptions };
        }
        return { ...p };
      })
    );
  }

  function handleToggleVisibleAlert(id) {
    setProblems(
      problems.map(p => {
        if (p.id === id) {
          return { ...p, visibleAlert: !p.visibleAlert };
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
      await api.delete(`/delivery/${id}/cancel-delivery`);
      toast.success(`A encomenda ${formattedId(id)} foi cancelada com sucesso`);
      handleToggleVisibleAlert(id);
    } catch (err) {
      toast.error(`Não foi possível cancelar a encomenda ${formattedId(id)}`);
      handleToggleVisibleAlert(id);
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
              <OptionsList visible={problem.visibleOptions}>
                <ul>
                  <li>
                    <MdVisibility size={14} color="#8E5BE8" />
                    <button
                      type="button"
                      onClick={() => handleToggleOpenModal(problem.id)}
                    >
                      Visualizar
                    </button>
                    <Modal visible={problem.modalOpen}>
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
                    <CancellationAlert visible={problem.visibleAlert}>
                      <CancellationAlertContent ref={alertContentRef}>
                        <h3>Atenção!!!</h3>
                        <p>
                          Você realmente deseja cancelar a encomenda{' '}
                          <strong>{formattedId(problem.delivery.id)}</strong>?
                        </p>
                        <p>
                          <strong>Produto: </strong>
                          {problem.delivery.product}
                        </p>
                        <div>
                          <ConfirmButton
                            onClick={() => cancelOrder(problem.delivery.id)}
                          >
                            Sim
                          </ConfirmButton>
                          <CancelButton
                            onClick={() => handleToggleVisibleAlert(problem.id)}
                          >
                            Não
                          </CancelButton>
                        </div>
                      </CancellationAlertContent>
                    </CancellationAlert>
                  </li>
                </ul>
              </OptionsList>
            </td>
          </tr>
        ))}
      </table>
    </Container>
  );
}
