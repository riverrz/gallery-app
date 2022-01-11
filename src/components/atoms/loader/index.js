import React from "react";
import { FiLoader } from "react-icons/fi";
import styles from "./loader.module.css";

function Loader() {
  return <FiLoader className={styles.loader} color="dodgerblue" size={32} />;
}

export default Loader;
