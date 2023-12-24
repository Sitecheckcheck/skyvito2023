import { NavLink, useNavigate } from "react-router-dom";
import s from "./profileSettings.module.css";
import cn from "classnames";
import { useAuth } from "../../hooks/use-auth";
import { useEffect, useState } from "react";
import { updateUser } from "../../api";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlise";

export const ProfileSettings = () => {
  const dispatch = useDispatch();
  const { name, surname, phone, city } = useAuth();
  const [nameText, setNameText] = useState(name);
  const [cityText, setCityText] = useState(city);
  const [surnameText, setSurnameText] = useState(surname);
  const [phoneText, setPhoneText] = useState(phone);
  const [activButton, setActivButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!nameText && !cityText && !surnameText && !phoneText) {
      setActivButton(false);
    }
  }, [nameText, cityText, surnameText, phoneText]);

  const handleUpdateUser = async (event) => {
    event.preventDefault();

    try {
      const response = await updateUser(
        nameText,
        surnameText,
        cityText,
        phoneText
      );

      dispatch(
        setUser({
          email: response.email,
          id: response.id,
          sells_from: response.sells_from,
          avatar: response.avatar,
          name: response.name,
          surname: response.surname,
          city: response.city,
          phone: response.phone,
        })
      );
    } catch (error) {
      if (error.message === "токен не рабочий") {
        navigate("/signin");
      }
    }
  };

  return (
    <div className={s.main__profile}>
      <div className={s.profile__content}>
        <h3 className={cn(s.profile__title, s.title)}>Настройки профиля</h3>
        <div className={s.profile__settings}>
          <div className={s.settings__left}>
            <div className={s.settings__img}>
              <NavLink to="/" target="_self">
                <img src="#" alt="" />
              </NavLink>
            </div>
            <NavLink className={s.settings__change_photo} to="/">
              Заменить
            </NavLink>
          </div>
          <div className={s.settings__right}>
            <form className={s.settings__form} onSubmit={handleUpdateUser}>
              <div className={s.settings__div}>
                <label htmlFor="fname">Имя</label>
                <input
                  className={s.settings__f_name}
                  id="settings-fname"
                  name="fname"
                  type="text"
                  value={nameText}
                  placeholder="введите имя"
                  onChange={(event) => {
                    setNameText(event.target.value);
                    setActivButton(true);
                  }}
                />
              </div>

              <div className={s.settings__div}>
                <label htmlFor="lname">Фамилия</label>
                <input
                  className={s.settings__l_name}
                  id="settings-lname"
                  name="lname"
                  type="text"
                  defaultValue={surnameText}
                  placeholder="введите фамилию"
                  onChange={(event) => {
                    setSurnameText(event.target.value);
                    setActivButton(true);
                  }}
                />
              </div>

              <div className={s.settings__div}>
                <label htmlFor="city">Город</label>
                <input
                  className={s.settings__city}
                  id="settings-city"
                  name="city"
                  type="text"
                  defaultValue={cityText}
                  placeholder="введите город"
                  onChange={(event) => {
                    setCityText(event.target.value);
                    setActivButton(true);
                  }}
                />
              </div>

              <div className={s.settings__div}>
                <label htmlFor="phone">Телефон</label>
                <input
                  className={s.settings__phone}
                  id="settings-phone"
                  name="phone"
                  type="tel"
                  defaultValue={phoneText}
                  placeholder="введите телефон"
                  onChange={(event) => {
                    setPhoneText(event.target.value);
                    setActivButton(true);
                  }}
                />
              </div>

              <button
                className={
                  !activButton
                    ? cn(s.settings__btn)
                    : cn(s.settings__btn_activ, s.btn_hov02)
                }
                id="settings-btn"
                type="submit"
                disabled={!activButton}
              >
                Сохранить
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
