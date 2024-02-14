import { NavLink } from "react-router-dom";
import styles from "./footer.module.css";
import { createPortal } from "react-dom";
import { useState } from "react";
import { Modal } from "../modal/modal";
import { AddProduct } from "../../pages/addProduct/addProduct";
import { useAuth } from "../../hooks/use-auth";

export const Footer = () => {
  const [isOpen, setIsOpen] = useState("");
  const { isAllowed } = useAuth();

  const getModalForm = () => {
    if (isOpen === "open") {
      return <AddProduct onFormClose={() => setIsOpen("")} />;
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__img}>
          <NavLink to="/" target="_self">
            <img src="/img/icon_01.png" alt="home" />
          </NavLink>
        </div>
        <div className={styles.footer__img} onClick={() => setIsOpen("open")}>
          {/* <NavLink to="/add-product" target="_self"> */}
          <img src="/img/icon_02.png" alt="home" />
          {/* </NavLink> */}
        </div>
        <div className={styles.footer__img}>
          <NavLink to={isAllowed ? "/profile" : "/signin"} target="_self">
            <img src="/img/icon_03.png" alt="home" />
          </NavLink>
        </div>
      </div>
      {createPortal(
        <Modal isOpen={isOpen}>{getModalForm()}</Modal>,
        document.body
      )}
    </footer>
  );
};
