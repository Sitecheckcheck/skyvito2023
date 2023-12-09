import { NavLink } from "react-router-dom"
import styles from "./footer.module.css"

export const Footer = () => {
    return (
        <footer className={styles.footer}>
        <div className={styles.footer__container}>
          <div className={styles.footer__img}>
            <NavLink to="/" target="_self">
              <img src="/img/icon_01.png" alt="home" />
            </NavLink>
          </div>
          <div className={styles.footer__img}>
            <NavLink to="/" target="_self">
              <img src="/img/icon_02.png" alt="home" />
            </NavLink>
          </div>
          <div className={styles.footer__img}>
            <NavLink to="/profile" target="_self">
              <img src="/img/icon_03.png" alt="home" />
            </NavLink>
          </div>
        </div>
      </footer>
    )
}