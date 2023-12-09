import { NavLink } from "react-router-dom";
import s from "./mainMenu.module.css";
import cn from "classnames";

export const MainMenu = () => {
  return (
    <div class={s.main__menu}>
      <NavLink class={s.menu__logo_link} to="/" target="_blank">
        <img class={s.menu__logo_img} src="/img/logo.png" alt="logo" />
      </NavLink>
      <form class={s.menu__form} action="#">
        <button class={cn(s.menu__btn, s.btn_hov02)} id="btnGoBack">
          Вернуться на&nbsp;главную
        </button>
      </form>
    </div>
  );
};
