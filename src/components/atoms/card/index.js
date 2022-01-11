import classNames from "classnames";
import React from "react";
import styles from "./card.module.css";

function Card({ imgUrl, description, className, ...rest }) {
  return (
    <div
      className={classNames(styles.container, className)}
      style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
      {...rest}
    >
      <h4 className={styles.description}>{description}</h4>
    </div>
  );
}

export default React.memo(Card);
