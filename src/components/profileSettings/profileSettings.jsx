import { NavLink } from "react-router-dom";
import s from "./profileSettings.module.css";
import cn from "classnames";

export const ProfileSettings = () => {
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
            <form className={s.settings__form} action="#">
              <div className={s.settings__div}>
                <label htmlFor="fname">Имя</label>
                <input
                  className={s.settings__f_name}
                  id="settings-fname"
                  name="fname"
                  type="text"
                  value="Ан"
                  placeholder=""
                />
              </div>

              <div className={s.settings__div}>
                <label htmlFor="lname">Фамилия</label>
                <input
                  className={s.settings__l_name}
                  id="settings-lname"
                  name="lname"
                  type="text"
                  value="Городецкий"
                  placeholder=""
                />
              </div>

              <div className={s.settings__div}>
                <label htmlFor="city">Город</label>
                <input
                  className={s.settings__city}
                  id="settings-city"
                  name="city"
                  type="text"
                  value="Санкт-Петербург"
                  placeholder=""
                />
              </div>

              <div className={s.settings__div}>
                <label htmlFor="phone">Телефон</label>
                <input
                  className={s.settings__phone}
                  id="settings-phone"
                  name="phone"
                  type="tel"
                  value="89161234567"
                  placeholder="+79161234567"
                />
              </div>

              <button
                className={cn(s.settings__btn, s.btn_hov02)}
                id="settings-btn"
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
