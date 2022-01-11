import classNames from "classnames";
import styles from "./responsiveGrid.module.css";

export default function ResponsiveGrid({ children, className }) {
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
}
