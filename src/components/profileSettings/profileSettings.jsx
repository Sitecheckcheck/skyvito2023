import { Link, useNavigate } from "react-router-dom";
import s from "./profileSettings.module.css";
import cn from "classnames";
import { useAuth } from "../../hooks/use-auth";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../../store/userSlise";
import { useSetAvatarUserMutation, useUpdateUserMutation } from "../../store/productsApi";

export const ProfileSettings = () => {
  const dispatch = useDispatch();
  const { name, surname, phone, city, avatar } = useAuth();
  const [nameText, setNameText] = useState(name);
  const [cityText, setCityText] = useState(city);
  const [surnameText, setSurnameText] = useState(surname);
  const [phoneText, setPhoneText] = useState(phone);
  const [activButton, setActivButton] = useState(false);
  const navigate = useNavigate();
  const filePicker = useRef(null);
  const [updateUser] = useUpdateUserMutation();
  const [setAvatarUser] = useSetAvatarUserMutation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!nameText && !cityText && !surnameText && !phoneText) {
      setActivButton(false);
    }
  }, [nameText, cityText, surnameText, phoneText]);

  const handleUpdateUser = async (event) => {
    event.preventDefault();

    setLoading(true)

    try {
      const response = await updateUser({
        nameText,
        cityText,
        surnameText,
        phoneText,
      });

      dispatch(
        setUser({
          email: response.data.email,
          id: response.data.id,
          sells_from: response.data.sells_from,
          avatar: response.data.avatar,
          name: response.data.name,
          surname: response.data.surname,
          city: response.data.city,
          phone: response.data.phone,
        })
      );
      setActivButton(false);
    } catch (error) {
      if (error.message === "токен не рабочий") {
        navigate("/signin");
      }
    } finally {
      setLoading(false)
    }
  };

  const handleSetAvatar = async (file) => {
    try {
      setLoading(true)
      const response = await setAvatarUser(file);

      dispatch(
        setUser({
          email: response.data.email,
          id: response.data.id,
          sells_from: response.data.sells_from,
          avatar: response.data.avatar,
          name: response.data.name,
          surname: response.data.surname,
          city: response.data.city,
          phone: response.data.phone,
        })
      );
    } catch (error) {
      navigate("/signin");
    } finally {
      setLoading(false)
    }
  };

  const handleImgAdd = (event) => {
    handleSetAvatar(event.target.files[0]);
  };

  const handlePick = () => {
    filePicker.current.click();
  };

  return (
    <div className={s.main__profile}>
      <div className={s.profile__content}>
        <h3 className={cn(s.profile__title, s.title)}>Настройки профиля</h3>
        <div className={s.profile__settings}>
          <div className={s.settings__left}>
            <div className={s.settings__img}>
              <Link to="/profile" target="_self">
                <img
                  src={avatar ? `http://localhost:8090/${avatar}` : null}
                  alt=""
                />
              </Link>

              <input
                className={s.hidden}
                type="file"
                ref={filePicker}
                // multiple
                onChange={handleImgAdd}
                accept="image/*, .png, .jpg, .gif, .web, .jpeg"
              ></input>
            </div>
            <div className={s.settings__change_photo} onClick={handlePick}>
              Заменить
            </div>
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
              <div className={s.buttons_box}>
                <button
                  className={
                    !activButton
                      ? cn(s.settings__btn)
                      : cn(s.settings__btn_activ, s.btn_hov02)
                  }
                  id="settings-btn"
                  type="submit"
                  disabled={!activButton || loading}
                >
                  {loading ? "Загрузка..." : "Сохранить"}
                </button>
                <button
                  className={cn(s.settings__btn_activ, s.btn_hov02)}
                  id="settings-btn"
                  onClick={() => {
                    dispatch(removeUser());
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    navigate("/");
                    localStorage.removeItem("email");
                    localStorage.removeItem("tokenTime");
                    navigate("/");
                  }}
                >
                  Выйти
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
