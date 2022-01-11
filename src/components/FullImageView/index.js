import React from "react";
import styles from "./fullImageView.module.css";

function FullImageView({ url, alt, closeModal }) {
  return (
    <div className={styles.container}>
      <img src={url} alt={alt} className={styles.img} />
    </div>
  );
}

export default FullImageView;
