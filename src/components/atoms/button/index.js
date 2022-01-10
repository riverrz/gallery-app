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
        { "btn--primary": primary, "btn--secondary": secondary },
        className
      )}
      {...rest}
    />
  );
}
