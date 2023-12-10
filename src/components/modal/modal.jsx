import styles from "./modal.module.css";
import cn from "classnames";

export const Modal = ({ children, isOpen }) => {
  return (
    <div className={isOpen ? cn(styles.modalOpen, styles.container_bg) : styles.modalHidden}>
      {children}
    </div>
  );
};