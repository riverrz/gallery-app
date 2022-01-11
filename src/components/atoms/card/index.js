import React from "react";
import styles from "./card.module.css";

function Card({ imgUrl, alt }) {
  return (
    <div
      className={styles.container}
      title={alt}
      style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
    ></div>
  );
}

export default React.memo(Card);
