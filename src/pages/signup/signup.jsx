import s from "./signup.module.css";
import cn from "classnames";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser, getTokens } from "../../api";
import { setUser } from "../../store/userSlise";
import { useDispatch } from "react-redux";

export const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [errorText, setErrorText] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorText("Укажите email/пароль");
      return;
    }

    if (password !== repeatPassword) {
      setErrorText("Пароли не совпадают");
      return;
    }

    if (email.length < 3) {
      setErrorText("Введенный E-mail слишком короткий");
      return;
    }

    if (password.length < 6) {
      setErrorText("Введенный пароль слишком короткий");
      return;
    }

    try {
      setDisabled(true);
      const user = await addUser(email, password, name, surname, city);
      const tokens = await getTokens(user.email, password);

      dispatch(
        setUser({
          email: user.email,
          name: user.name,
          surname: user.surname,
          city: user.city,
          avatar: user.avatar,
          id: user.id,
          phone: user.phone,
          sells_from: user.sells_from,
        })
      );

      localStorage.setItem('tokenTime', new Date().getTime())
      localStorage.setItem("access_token", tokens.access_token.toString());
      localStorage.setItem("refresh_token", tokens.refresh_token.toString());

      navigate("/");
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
            className={cn(s.modal__input, s.login)}
            type="password"
            name="password"
            id="formpassword"
            placeholder="Пароль"
            onChange={(event) => {
              setPassword(event.target.value);
              setErrorText("");
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
              setErrorText("");
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
            type="submit"
            disabled={disabled}
          >
            <span>Зарегистрироваться</span>
          </button>
          <div className={s.error_box}>
            <p className={s.error_text}>{errorText}</p>
          </div>
        </form>
      </div>
    </div>
  );
};
