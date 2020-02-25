import React, { useRef, useState, useEffect } from 'react';
import { MdMoreHoriz, MdVisibility, MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';

import api from '~/services/api';
import formattedId from '~/utils/formattedId';
import { Container, OptionsList, Modal, ModalContent } from './styles';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [visibleOption, setVisibleOption] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const modalContentRef = useRef();

  useEffect(() => {
    async function loadRecepients() {
      const response = await api.get('/delivery/problems');

      setProblems(response.data);
    }

    loadRecepients();
  }, [problems]);

  const handleOutsideModalClick = e => {
    if (modalContentRef.current.contains(e.target)) {
      return;
    }
    if (visibleModal) {
      setVisibleModal(!visibleModal);
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

  function handleToggleVisibleModal() {
    setVisibleModal(!visibleModal);
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
                    <Link to="/">Cancelar encomenda</Link>
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
