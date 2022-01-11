import styles from "./responsiveGrid.module.css";

export default function ResponsiveGrid({ children }) {
  return <div className={styles.container}>{children}</div>;
}
