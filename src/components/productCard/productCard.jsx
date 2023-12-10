import { NavLink } from "react-router-dom";
import styles from "./productCard.module.css";
import { useGetAllProductsQuery } from "../../store/productsApi/productsApi";
import { DateBlock } from "../dateBlock/dateBlock";

export const ProductCard = ({ TitleBox }) => {
  const allProducts = useGetAllProductsQuery();
  // console.log(allProducts?.data[4])
  return (
    <>
      {allProducts?.data?.map((item) => (
        <div className={styles.cards__item} key={item.id}>
          <div className={styles.cards__card}>
            <div className={styles.card__image}>
              <NavLink to={TitleBox === "Мои товары" ? "/my-adv" : "/adv"}>
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
              <NavLink to={TitleBox === "Мои товары" ? "/my-adv" : "/adv"}>
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
