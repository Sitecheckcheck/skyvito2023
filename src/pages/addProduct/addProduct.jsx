import s from "./addProduct.module.css";
import cn from "classnames";

export const AddProduct = () => {
  return (
    <div className={s.container_bg}>
      <div className={s.modal__block}>
        <div className={s.modal__content}>
          <h3 className={s.modal__title}>Новое объявление</h3>
          <div className={s.modal__btn_close}>
            <div className={s.modal__btn_close_line}></div>
          </div>
          <form
            className={cn(s.modal__form_newArt, s.form_newArt)}
            id="formNewArt"
            action="#"
          >
            <div className={s.form_newArt__block}>
              <label for="name">Название</label>
              <input
                className={s.form_newArt__input}
                type="text"
                name="name"
                id="formName"
                placeholder="Введите название"
              />
            </div>
            <div className={s.form_newArt__block}>
              <label for="text">Описание</label>
              <textarea
                className={s.form_newArt__area}
                name="text"
                id="formArea"
                cols="auto"
                rows="10"
                placeholder="Введите описание"
              ></textarea>
            </div>
            <div className={s.form_newArt__block}>
              <p className={s.form_newArt__p}>
                Фотографии товара<span>не более 5 фотографий</span>
              </p>
              <div className={s.form_newArt__bar_img}>
                <div className={s.form_newArt__img}>
                  <img src="" alt="" />
                  <div className={s.form_newArt__img_cover}></div>
                </div>
              </div>
            </div>
            <div className={cn(s.form_newArt__block, s.block_price)}>
              <label for="price">Цена</label>
              <input
                className={s.form_newArt__input_price}
                type="text"
                name="price"
                id="formName"
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
