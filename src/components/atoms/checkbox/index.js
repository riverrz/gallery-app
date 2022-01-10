import styles from "./checkbox.module.css";

export default function Checkbox({ className, id, label, ...rest }) {
  return (
    <div className={styles.container}>
      <input type="checkbox" id={id} {...rest} />
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
