import { NavLink } from "react-router-dom";
import styles from "./productCard.module.css";
import {
  useGetAllProductsQuery,
  useGetMeProductsQuery,
} from "../../store/productsApi/productsApi";
import { DateBlock } from "../dateBlock/dateBlock";
import { updateToken } from "../../api";
import { useState } from "react";

export const ProductCard = ({ TitleBox }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const allProducts = useGetAllProductsQuery();
  const myProducts = useGetMeProductsQuery(localStorage.getItem("access_token"));

  // if (myProducts.error?.status === 401) {
  //   const access = localStorage.getItem("access_token");
  //   const refresh = localStorage.getItem("refresh_token");
  //   updateToken(access, refresh).then((res) => {
  //     console.log(object)
  //   });

    // setToken(newToken)
  // }

  const products =
    TitleBox === "Мои товары" ? myProducts.data : allProducts.data;
  // console.log(products);
  return (
    <>
      {products?.map((item) => (
        <div className={styles.cards__item} key={item.id}>
          <div className={styles.cards__card}>
            <div className={styles.card__image}>
              <NavLink
                to={
                  TitleBox === "Мои товары" ? "/my-adv" : `/adv/?id=${item.id}`
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
                  TitleBox === "Мои товары" ? "/my-adv" : `/adv/?id=${item.id}`
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
