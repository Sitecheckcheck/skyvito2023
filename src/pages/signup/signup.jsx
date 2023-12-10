import {
  NavLink,
  // useNavigate
} from "react-router-dom";
import s from "./signup.module.css";
import cn from "classnames";

export const Signup = () => {
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
            className={cn(s.modal__input, s.login)}
            type="password"
            name="password"
            id="formpassword"
            placeholder="Пароль"
          />
          <input
            className={cn(s.modal__input, s.login)}
            type="password"
            name="password"
            id="passwordSecond"
            placeholder="Повторите пароль"
          />
          <input
            className={cn(s.modal__input, s.login)}
            type="text"
            name="first-name"
            id="first-name"
            placeholder="Имя (необязательно)"
          />
          <input
            className={cn(s.modal__input, s.login)}
            type="text"
            name="first-last"
            id="first-last"
            placeholder="Фамилия (необязательно)"
          />
          <input
            className={cn(s.modal__input, s.login)}
            type="text"
            name="city"
            id="city"
            placeholder="Город (необязательно)"
          />
          <button className={s.modal__btn_signup_ent} id="btnSignUp">
            <NavLink to="/">Зарегистрироваться</NavLink>
          </button>
        </form>
      </div>
    </div>
  );
};
