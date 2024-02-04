import { NavLink } from "react-router-dom";
import styles from "./productCard.module.css";
import { DateBlock } from "../dateBlock/dateBlock";

export const ProductCard = ({ TitleBox, products }) => {
  return (
    <>
      {products?.map((item) => (
        <div className={styles.cards__item} key={item.id}>
          <div className={styles.cards__card}>
            <div className={styles.card__image}>
              <NavLink
                to={
                  TitleBox === "Мои товары"
                    ? `/my-ads/?id=${item.id}`
                    : `/ads/?id=${item.id}`
                }
              >
                <img
                  src={
                    item.images[0]?.url
                      ? `http://localhost:8090/${item.images[0]?.url}`
                      : "/img/no-foto.png"
                  }
                  alt="product"
                />
              </NavLink>
            </div>
            <div className={styles.card__content}>
              <NavLink
                to={
                  TitleBox === "Мои товары"
                    ? `/my-ads/?id=${item.id}`
                    : `/ads/?id=${item.id}`
                }
              >
                <h3 className={styles.card__title}>{item.title}</h3>
              </NavLink>
              <p className={styles.card__price}>{item.price}</p>
              <p className={styles.card__place}>{item.user.city}</p>

              <p className={styles.card__date}>
                <DateBlock time={item.created_on} type="card" />
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
