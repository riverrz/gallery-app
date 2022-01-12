import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Portal } from "..";
import styles from "./modal.module.css";

function Modal({ children, closeModal }) {
  useEffect(() => {
    const bodyEl = document.querySelector("body");
    bodyEl.style.overflow = "hidden";
    return () => (bodyEl.style.overflow = "visible");
  }, []);

  return (
    <Portal>
      <div className={styles.container}>
        <AiOutlineClose
          className={styles.closeIcon}
          size={32}
          color="#fff"
          onClick={closeModal}
        />
        <div className={styles.overlay} onClick={closeModal} />
        <div className={styles["modal-body"]}>{children}</div>
      </div>
    </Portal>
  );
}

export default Modal;
