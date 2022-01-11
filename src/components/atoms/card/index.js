import React from "react";
import styles from "./card.module.css";

function Card({ imgUrl, description }) {
  return (
    <div
      className={styles.container}
      style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
    >
      <h4 className={styles.description}>{description}</h4>
    </div>
  );
}

export default React.memo(Card);
