import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import styles from "./search.module.css";

export default function Search({ onChange }) {
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    onChange(searchVal);
  }, [searchVal]);

  return (
    <div className={styles.container}>
      <FaSearch size={24} className={styles["search-icon"]} />
      <input
        type="search"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        className={styles["search-input"]}
      />
    </div>
  );
}
