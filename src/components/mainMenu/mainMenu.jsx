import { NavLink, useNavigate } from "react-router-dom";
import s from "./mainMenu.module.css";
import cn from "classnames";

export const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div className={s.main__menu}>
      <NavLink className={s.menu__logo_link} to="/skyvito2023">
        <img className={s.menu__logo_img} src="skyvito2023/img/logo.png" alt="logo" />
      </NavLink>
      <form className={s.menu__form} action="#">
        <button
          className={cn(s.menu__btn, s.btn_hov02)}
          id="btnGoBack"
          onClick={() => {
            navigate(`/`);
          }}
        >
          Вернуться на&nbsp;главную
        </button>
      </form>
    </div>
  );
};
