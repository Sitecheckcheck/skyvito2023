import s from "./signup.module.css";
import cn from "classnames";
import { useState } from "react";
import { useAddUserMutation } from "../../store/authApi/authApi";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const [handleSignUp] = useAddUserMutation();

  const handlButton = () => {
    if (!email || !password) {
      setError("Укажите email/пароль");
      return;
    }

    if (password !== repeatPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (email.length < 3) {
      setError("Введенный E-mail слишком короткий");
      return;
    }

    if (password.length < 6) {
      setError("Введенный пароль слишком короткий");

      return;
    }
    
    handleSignUp({ email, password, name, surname, city }).then((resp) => {
      console.log(resp.status)
    });
    
  };
  
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
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
          />
          <input
            className={cn(s.modal__input, s.login)}
            type="password"
            name="password"
            id="formpassword"
            placeholder="Пароль"
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
          />
          <input
            className={cn(s.modal__input, s.login)}
            type="password"
            name="password"
            id="passwordSecond"
            placeholder="Повторите пароль"
            onChange={(event) => {
              setRepeatPassword(event.target.value);
              setError("");
            }}
          />
          <input
            className={cn(s.modal__input, s.login)}
            type="text"
            name="first-name"
            id="first-name"
            placeholder="Имя (необязательно)"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            className={cn(s.modal__input, s.login)}
            type="text"
            name="first-last"
            id="first-last"
            placeholder="Фамилия (необязательно)"
            onChange={(event) => {
              setSurname(event.target.value);
            }}
          />
          <input
            className={cn(s.modal__input, s.login)}
            type="text"
            name="city"
            id="city"
            placeholder="Город (необязательно)"
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
          <button
            className={s.modal__btn_signup_ent}
            id="btnSign"
            onClick={() => {
              handlButton();
            }}
          >
            <span>Зарегистрироваться</span>
          </button>
          <div className={s.error_box}>
            <p className={s.error_text}>{error}</p>
          </div>
        </form>
      </div>
    </div>
  );
};
