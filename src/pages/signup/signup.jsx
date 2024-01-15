import s from "./signup.module.css";
import cn from "classnames";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTokens } from "../../apiTokens";
import { setUser } from "../../store/userSlise";
import { useDispatch } from "react-redux";
import {
  useAddUserMutation,
  useLazyGetUserQuery,
} from "../../store/productsApi";

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
  const [addUser] = useAddUserMutation();
  const [getUser] = useLazyGetUserQuery();

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

    setDisabled(true);

    const user = await addUser({ email, password, name, surname, city });

    if (user.error?.status === 400) {
      setErrorText("такой пользователь уже есть");
      return;
    } else if (user.error?.status === 422) {
      setErrorText("не корректные данные");
      return;
    } else if (user.error) {
      setErrorText("ошибка сервера");
      return;
    }

    const tokens = await getTokens(email, password);

    localStorage.setItem("access_token", tokens.access_token.toString());
    localStorage.setItem("refresh_token", tokens.refresh_token.toString());

    const registerUser = await getUser();
    localStorage.setItem('email', registerUser.data.email)
    registerUser?.data &&
      dispatch(
        setUser({
          email: registerUser.data.email,
          name: registerUser.data.name,
          surname: registerUser.data.surname,
          city: registerUser.data.city,
          avatar: registerUser.data.avatar,
          id: registerUser.data.id,
          phone: registerUser.data.phone,
          sells_from: registerUser.data.sells_from,
        })
      );

    navigate("/");

    setDisabled(false);
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
              setDisabled(false);
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
              setDisabled(false);
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
              setDisabled(false);
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
              setDisabled(false);
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
              setDisabled(false);
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
              setDisabled(false);
            }}
          />
          <button
            className={disabled ? s.modal__btn_signup_ent_disabled : s.modal__btn_signup_ent}
            id="btnSign"
            type="submit"
            disabled={disabled}
          >
            <span>{disabled ? 'Loading...' : 'Зарегистрироваться'}</span>
          </button>
          <div className={s.error_box}>
            <p className={s.error_text}>{errorText}</p>
          </div>
        </form>
      </div>
    </div>
  );
};
