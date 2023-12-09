import cn from "classnames";
import s from "./header.module.css";
import { NavLink, useNavigate } from "react-router-dom";

export const Header = ({ isAllowed, page = "notMain" }) => {
  const navigate = useNavigate();

  return (
    <div className={page === "main" ? s.headerMainPage : s.header}>
      <nav className={s.header__nav}>
        <div className={s.header__logo}>
          <NavLink className={s.logo_mob__link} to="/" >
            <img className={s.logo_mob__img} src="/img/logo-mob.png" alt="logo" />
          </NavLink>
        </div>
        {isAllowed ? (
          <>
            <button
              className={cn(s.header__btn_putAd, s.btn_hov01)}
              id="btputAd"
              onClick={() => {
                navigate(`/`);
              }}
            >
              Разместить объявление
            </button>
            <button className={cn(s.header__btn_lk, s.btn_hov01)} id="btnlk" onClick={() => {
                navigate(`/profile`);
              }}>
              Личный кабинет
            </button>
          </>
        ) : (
          <button
            className={cn(s.header__btn_main_enter, s.btn_hov01)}
            id="btnMainEnter"
          >
            Вход в личный кабинет
          </button>
        )}
      </nav>
    </div>
  );
};
