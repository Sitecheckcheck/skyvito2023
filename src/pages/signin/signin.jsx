import { NavLink, useNavigate } from "react-router-dom";
import s from "./signin.module.css";
import cn from "classnames";
import { useState } from "react";
// import { useGetTokensMutation } from "../../store/authApi/authApi";


import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlise";
import { getTokens, getUser } from "../../api";

export const Signin = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorText("Укажите email/пароль");
      return;
    }

    try {
      setDisabled(true);
      const tokens = await getTokens(email, password);
      const user = await getUser(tokens.access_token);

      dispatch(
        setUser({
          email: user.email,
          name: user.name,
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
        })
      );
      localStorage.setItem("email", user.email);
      localStorage.setItem("name", user.name);
      localStorage.setItem("access_token", tokens.access_token.toString());
      localStorage.setItem("refresh_token", tokens.refresh_token.toString());
      navigate('/');
    } catch (error) {
      setErrorText(error.message);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className={s.container_signup}>
      <div className={s.modal__block}>
        <form
          className={s.modal__form_login}
          id="formLogIn"
          onSubmit={
            onSubmit
          }
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
          <button
            className={s.modal__btn_signup}
            id="btnSignUp"
            disabled={disabled}
          >
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
