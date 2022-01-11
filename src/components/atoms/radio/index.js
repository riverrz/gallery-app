import classNames from "classnames";
import styles from "./radio.module.css";

export default function Radio({ className, id, label, ...rest }) {
  return (
    <div className={styles.container}>
      <input
        className={classNames(styles.radio, className)}
        type="radio"
        id={id}
        {...rest}
      />
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
