// import { NavLink, useNavigate } from "react-router-dom";
import s from "./editProduct.module.css";
import cn from "classnames";

export const EditProduct = ({ onFormClose }) => {
  //   const navigate = useNavigate();

  const productName = "Ракетка для большого тенниса Triumph Pro STС Б/У";
  const productDiscription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const productImges = [{ img: "/img/pic5.jpg" }];
  const productPrice = "2200";

  return (
    <div className={s.container_bg}>
      <div className={s.modal__block}>
        <div className={s.modal__content}>
          <h3 className={s.modal__title} onClick={onFormClose}>
            Редактировать объявление
          </h3>
          <div className={s.modal__btn_close} onClick={onFormClose}>
            <div className={s.modal__btn_close_line}></div>
          </div>
          <form
            className={cn(s.modal__form_newArt, s.form_newArt)}
            id="formNewArt"
            action="#"
          >
            <div className={s.form_newArt__block}>
              <label htmlFor="name">Название</label>
              <input
                className={s.form_newArt__input}
                type="text"
                name="name"
                id="formName"
                placeholder="Введите название"
                value={productName}
              />
            </div>
            <div className={s.form_newArt__block}>
              <label htmlFor="text">Описание</label>
              <textarea
                className={s.form_newArt__area}
                name="text"
                id="formArea"
                cols="auto"
                rows="10"
                placeholder="Введите описание"
                value={productDiscription}
              ></textarea>
            </div>
            <div className={s.form_newArt__block}>
              <p className={s.form_newArt__p}>
                Фотографии товара<span>не более 5 фотографий</span>
              </p>
              <div className={s.form_newArt__bar_img}>
                {productImges.length !== 0
                  ? productImges.map((item) => (
                      <div className={s.form_newArt__img}>
                        <img src={item.img} alt="" />
                      </div>
                    ))
                  : ""}
                <div className={s.form_newArt__img}>
                  <img src="" alt="" />
                  <div className={s.form_newArt__img_cover}></div>
                </div>
              </div>
            </div>
            <div className={cn(s.form_newArt__block, s.block_price)}>
              <label htmlFor="price">Цена</label>
              <input
                className={s.form_newArt__input_price}
                type="text"
                name="price"
                id="formName"
                value={productPrice}
              />
              <div className={s.form_newArt__input_price_cover}></div>
            </div>

            <button
              className={cn(s.form_newArt__btn_pub, s.btn_hov02)}
              id="btnPublish"
            >
              Опубликовать
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
