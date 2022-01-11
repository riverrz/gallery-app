import React from "react";
import { Portal } from "..";
import styles from "./modal.module.css";

function Modal({ children, closeModal }) {
  return (
    <Portal>
      <div className={styles.container}>
        <div className={styles.overlay} onClick={closeModal} />
        <div className={styles["modal-body"]}>{children}</div>
      </div>
    </Portal>
  );
}

export default Modal;
