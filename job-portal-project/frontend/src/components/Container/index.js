import React from "react";
import styles from "./index.module.css";

/**
 * Component Container
 * Menggunakan Teknik Composition (props.children) sesuai instruksi dosen
 * Berfungsi membatasi lebar konten agar tidak terlalu melebar pada layar desktop
 */
function Container({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default Container;