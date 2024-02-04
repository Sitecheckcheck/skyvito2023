import cn from "classnames";
import s from "./search.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export const Search = ({ products, setProductsShow }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchText) {
      const searchProductsList = products.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );

      setProductsShow(searchProductsList);
    } else {
      setProductsShow(products);
    }
  };

  return (
    <div className={s.main__search}>
      <NavLink className={s.search__logo_link} to="/">
        <img className={s.search__logo_img} src="/img/logo.png" alt="logo" />
      </NavLink>
      <NavLink className={s.search__logo_mob_link} to="/">
        <img
          className={s.search__logo_mob_img}
          src="/img/logo-mob.png"
          alt="logo"
        />
      </NavLink>
      <form className={s.search__form} onSubmit={handleSearch}>
        <input
          className={s.search__text}
          type="search"
          placeholder="Поиск по объявлениям"
          name="search"
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
        />
        <input
          className={s.search__text_mob}
          type="search"
          placeholder="Поиск"
          name="search-mob"
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
        />
        <button className={cn(s.search__btn, s.btn_hov02)} type="submit">
          Найти
        </button>
      </form>
    </div>
  );
};
