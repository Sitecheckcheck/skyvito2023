import {
  NavLink,
  // useNavigate
} from "react-router-dom";
import s from "./signin.module.css";
import cn from "classnames";

export const Signin = () => {
  //   const navigate = useNavigate();

  return (
    <div className={s.container_signup}>
      <div className={s.modal__block}>
        <form className={s.modal__form_login} id="formLogIn" action="#">
          <div className={s.modal__logo}>
            <img src="../img/logo_modal.png" alt="logo" />
          </div>
          <input
            className={cn(s.modal__input, s.login)}
            type="text"
            name="login"
            id="formlogin"
            placeholder="email"
          />
          <input
            className={cn(s.modal__input, s.password)}
            type="password"
            name="password"
            id="formpassword"
            placeholder="Пароль"
          />
          <button className={s.modal__btn_enter} id="btnEnter">
            <NavLink href="../index.html">Войти</NavLink>
          </button>
          <button className={s.modal__btn_signup} id="btnSignUp">
            <NavLink to="/signup">Зарегистрироваться</NavLink>
          </button>
        </form>
      </div>
    </div>
  );
};
