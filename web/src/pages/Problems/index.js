import React, { useRef, useState, useEffect } from 'react';
import { MdMoreHoriz, MdVisibility, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import formattedId from '~/utils/formattedId';
import {
  Container,
  OptionsList,
  Modal,
  ModalContent,
  CancellationAlert,
  CancellationAlertContent,
  ConfirmButton,
  CancelButton,
} from './styles';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [visibleOption, setVisibleOption] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);

  const modalContentRef = useRef();
  const alertContentRef = useRef();

  async function loadProblems() {
    const response = await api.get('/delivery/problems');
    setProblems(response.data);
  }

  useEffect(() => {
    loadProblems();
  }, [problems]);

  const handleOutsideModalClick = e => {
    if (modalContentRef.current.contains(e.target)) {
      return;
    }
    if (alertContentRef.current.contains(e.target)) {
      return;
    }
    if (visibleModal) {
      setVisibleModal(!visibleModal);
    }
    if (visibleAlert) {
      setVisibleAlert(!visibleAlert);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideModalClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideModalClick);
    };
  });

  function handleToggleVisibleOptions() {
    setVisibleOption(!visibleOption);
  }

  function handleToggleVisibleAlert() {
    setVisibleAlert(!visibleAlert);
  }

  function handleToggleVisibleModal() {
    setVisibleModal(!visibleModal);
  }

  async function cancelOrder(id) {
    try {
      await api.delete(`/delivery/${id}/cancel-delivery`);
      toast.success(`A encomenda ${formattedId(id)} foi cancelada com sucesso`);
      loadProblems();
      handleToggleVisibleAlert();
    } catch (err) {
      toast.error(`Não foi possível cancelar a encomenda ${formattedId(id)}`);
      handleToggleVisibleAlert();
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
              <button type="button" onClick={handleToggleVisibleOptions}>
                <MdMoreHoriz size={24} color="#C6C6C6" />
              </button>
              <OptionsList visible={visibleOption}>
                <ul>
                  <li>
                    <MdVisibility size={14} color="#8E5BE8" />
                    <button type="button" onClick={handleToggleVisibleModal}>
                      Visualizar
                    </button>
                    <Modal visible={visibleModal}>
                      <ModalContent ref={modalContentRef}>
                        <h4>VISUALIZAR PROBLEMA</h4>
                        <p>{problem.description}</p>
                      </ModalContent>
                    </Modal>
                  </li>
                  <li>
                    <MdDeleteForever size={14} color="#DE3B3B" />
                    <button type="button" onClick={handleToggleVisibleAlert}>
                      Cancelar encomenda
                    </button>
                    <CancellationAlert visible={visibleAlert}>
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
                          <CancelButton onClick={handleToggleVisibleAlert}>
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
