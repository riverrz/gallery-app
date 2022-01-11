import classNames from "classnames";
import styles from "./button.module.css";

export default function Button({
  primary = true,
  secondary = false,
  className,
  ...rest
}) {
  return (
    <button
      className={classNames(
        styles.btn,
        {
          [styles["btn--primary"]]: primary,
          [styles["btn--secondary"]]: secondary,
        },
        className
      )}
      {...rest}
    />
  );
}
