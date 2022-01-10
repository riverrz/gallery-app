import { FaSearch } from "react-icons/fa";
import styles from "./search.module.css";

export default function Search({ value = "", onChange }) {
  return (
    <div className={styles.container}>
      <FaSearch size={24} className={styles["search-icon"]} />
      <input
        type="search"
        value={value}
        onChange={onChange}
        className={styles["search-input"]}
      />
    </div>
  );
}
