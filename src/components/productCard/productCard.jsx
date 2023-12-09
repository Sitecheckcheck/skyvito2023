import { NavLink } from "react-router-dom"
import styles from "./productCard.module.css"

export const ProductCard = () => {
    return (
        <div className={styles.cards__item}>
        <div className={styles.cards__card}>
          <div className={styles.card__image}>
            <NavLink to="/adv" target="_blank">
              <img src="#" alt="product" />
            </NavLink>
          </div>
          <div className={styles.card__content}>
            <NavLink to="/adv" target="_blank">
              <h3 className={styles.card__title}>
                Ракетка для большого тенниса Triumph Pro ST
              </h3>
            </NavLink>
            <p className={styles.card__price}>2&nbsp;200&nbsp;₽</p>
            <p className={styles.card__place}>Санкт Петербург</p>
            <p className={styles.card__date}>Сегодня в&nbsp;10:45</p>
          </div>
        </div>
      </div>
    )
}