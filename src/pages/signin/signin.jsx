import { NavLink, useNavigate } from "react-router-dom";
import s from "./signin.module.css";
import cn from "classnames";
import { useState } from "react";
import { useGetTokensMutation } from "../../store/authApi/authApi";

export const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const [login] = useGetTokensMutation();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorText("Укажите email/пароль");
      return;
    }

    const response = await login({ email, password });

    if (response.data) {
      navigate("/");
    } else if (response.error?.status === 401) {
      setErrorText("неверный email/пароль");
    } else {
      setErrorText("ошибка сервера");
    }
  };

  return (
    <div className={s.container_signup}>
      <div className={s.modal__block}>
        <form
          className={s.modal__form_login}
          id="formLogIn"
          onSubmit={onSubmit}
        >
          <div className={s.modal__logo} onClick={() => navigate("/")}>
            <img src="../img/logo_modal.png" alt="logo" />
          </div>
          <input
            className={cn(s.modal__input, s.login)}
            type="text"
            name="login"
            id="formlogin"
            placeholder="email"
            onChange={(event) => {
              setEmail(event.target.value);
              setErrorText("");
            }}
          />
          <input
            className={cn(s.modal__input, s.password)}
            type="password"
            name="password"
            id="formpassword"
            placeholder="Пароль"
            onChange={(event) => {
              setPassword(event.target.value);
              setErrorText("");
            }}
          />
          <button className={s.modal__btn_enter} id="btnEnter" type="submit">
            <span>Войти</span>
          </button>
          <button className={s.modal__btn_signup} id="btnSignUp">
            <NavLink to="/signup">Зарегистрироваться</NavLink>
          </button>
          <div className={s.error_box}>
            <p className={s.error_text}>{errorText}</p>
          </div>
        </form>
      </div>
    </div>
  );
};
