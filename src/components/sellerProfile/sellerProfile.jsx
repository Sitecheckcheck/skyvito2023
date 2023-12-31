import { NavLink } from "react-router-dom";
import s from "./sellerProfile.module.css";
import { ArticleButton } from "../articleButton/articleButton";

export const SellerProfile = ({
  name,
  surname,
  city,
  sells_from,
  phone,
  avatar,
}) => {
  return (
    <div className={s.main__profile}>
      <div className={s.profile__content}>
        <div className={s.main__profile_sell}>
          <div className={s.profile_sell__content}>
            <div className={s.profile_sell__seller}>
              <div className={s.seller__left}>
                <div className={s.seller__img}>
                  <NavLink to="" target="_self">
                    <img src={`http://localhost:8090/${avatar}`} alt="" />
                  </NavLink>
                </div>
              </div>
              <div className={s.seller__right}>
                <h3 className={s.seller__title}>{name + " " + surname}</h3>
                <p className={s.seller__city}>{city}</p>
                <p
                  className={s.seller__inf}
                >{`Продает товары с ${sells_from}`}</p>

                <div className={s.seller__img_mob_block}>
                  <div className={s.seller__img_mob}>
                    <NavLink href="" target="_self">
                      <img src="#" alt="" />
                    </NavLink>
                  </div>
                </div>

                <ArticleButton page="product" phone={phone} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
