import cn from "classnames";
import s from "./search.module.css";
import {NavLink} from 'react-router-dom';


export const Search = () => {
  return (
    <div className={s.main__search}>
      <NavLink className={s.search__logo_link} to="/" target="_blank">
        <img className={s.search__logo_img} src="/img/logo.png" alt="logo" />
      </NavLink>
      <NavLink className={s.search__logo_mob_link} to="/" target="_blank">
            <img className={s.search__logo_mob_img} src="/img/logo-mob.png" alt="logo"/>
        </NavLink>
      <form className={s.search__form} action="#">
        <input
          className={s.search__text}
          type="search"
          placeholder="Поиск по объявлениям"
          name="search"
        />
        <input className={s.search__text_mob} type="search" placeholder="Поиск" name="search-mob"/>
        <button className={cn(s.search__btn, s.btn_hov02)}>Найти</button>
      </form>
    </div>
  );
};
