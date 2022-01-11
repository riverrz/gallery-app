import React, { useMemo, useState } from "react";
import { ModalContext } from "../contexts/modal.context";
import uniqid from "uniqid";
import { Modal } from "../components/atoms";

function AppModals({ children }) {
  const [modals, setModals] = useState([]);

  const closeModal = (modalId) => {
    setModals((prev) => prev.filter(({ id }) => id !== modalId));
  };

  const openModal = (ModalBody) => {
    const modalId = uniqid();

    setModals((prev) =>
      prev.concat({
        id: modalId,
        content: React.cloneElement(ModalBody, {
          closeModal: () => closeModal(modalId),
        }),
      })
    );
  };

  const contextValue = useMemo(() => {
    return {
      openModal,
    };
  }, []);

  return (
    <>
      {modals.map(({ content, id }) => (
        <Modal key={id} closeModal={() => closeModal(id)}>
          {content}
        </Modal>
      ))}
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
    </>
  );
}

export default AppModals;
