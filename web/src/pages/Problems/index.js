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
  // const [visibleOptions, setVisibleOptions] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);

  const modalContentRef = useRef();
  const alertContentRef = useRef();

  async function loadProblems() {
    const response = await api.get('/delivery/problems');
    setProblems(
      response.data.map(p => {
        return {
          ...p,
          // visibleModal: false,
          visibleOptions: false,
          // visibleAlert: false,
        };
      })
    );
    setProblems(response.data);
  }

  useEffect(() => {
    loadProblems();
  }, []);

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

  // function handleToggleVisibleOptions() {
  //   setVisibleOptions(!visibleOptions);
  // }

  // function handleToggleVisibleAlert() {
  //   setVisibleAlert(!visibleAlert);
  // }

  // function handleToggleVisibleModal() {
  //   setVisibleModal(!visibleModal);
  // }

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

  function handleToggleVisibleModal(id) {
    setProblems(
      problems.map(p => {
        if (p.id === id) {
          return { ...p, visibleModal: !p.visibleModal };
        }
        return { ...p };
      })
    );
  }

  // const handleOutsideModalClick = e => {
  //   const openModal = problems.find(p => p.visibleModal === true);
  //   const openAlert = problems.find(p => p.visibleAlert === true);

  //   if (
  //     modalContentRef.current &&
  //     !modalContentRef.current.contains(e.target)
  //   ) {
  //     console.tron.log(openModal);
  //     return;
  //   }
  //   if (alertContentRef.current.contains(e.target)) {
  //     return;
  //   }

  //   if (openModal) {
  //     // console.tron.log(openModal);
  //     // handleToggleVisibleModal(openModal.id);
  //   }

  //   if (openAlert) {
  //     console.tron.log(openAlert);
  //     // handleToggleVisibleAlert(openAlert.id);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleOutsideModalClick);

  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideModalClick);
  //   };
  // });

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
                      onClick={() => handleToggleVisibleModal(problem.id)}
                    >
                      Visualizar
                    </button>
                    <Modal visible={problem.visibleModal}>
                      <ModalContent ref={modalContentRef}>
                        <h4>VISUALIZAR PROBLEMA</h4>
                        <p>{problem.description}</p>
                      </ModalContent>
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
