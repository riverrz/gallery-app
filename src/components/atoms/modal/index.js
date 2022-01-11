import React, { useEffect } from "react";
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
        <div className={styles.overlay} onClick={closeModal} />
        <div className={styles["modal-body"]}>{children}</div>
      </div>
    </Portal>
  );
}

export default Modal;
