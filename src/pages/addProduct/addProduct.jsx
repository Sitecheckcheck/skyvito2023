import { useState } from "react";
import { useAddProductTextMutation } from "../../store/productsApi/productsApi";
import s from "./addProduct.module.css";
import cn from "classnames";
import { updateToken } from "../../api";
import { useNavigate } from "react-router-dom";

export const AddProduct = ({ onFormClose }) => {
  const [addProductText] = useAddProductTextMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate()

  const handleAddProduct = async (event) => {
    event.preventDefault();

    if (!title || !description || !price) {
      setErrorText("Не все поля заполнены");
      return;
    }

    try {
      await addProductText({
        access_token: localStorage.getItem("access_token"),
        ads: {
          title: title,
          description: description,
          price: price,
        },
      });
  
      navigate('/profile')

    } catch (error) {
      console.log(error)
    }

    const result = await addProductText({
      access_token: localStorage.getItem("access_token"),
      ads: {
        title: title,
        description: description,
        price: price,
      },
    });

    if (result.error?.status === 401) {
      const newToken = await updateToken(localStorage.getItem("access_token"), localStorage.getItem("refresh_token"));
      const newResult = await addProductText({
        access_token: newToken.access_token,
        ads: {
          title: title,
          description: description,
          price: price,
        },
      });
      
      if (newResult.error?.status === 401) {
        navigate('/signin')
      }
    }


    console.log(result)
    navigate('/profile')
    


  };

  return (
    <div className={s.container_bg}>
      <div className={s.modal__block}>
        <div className={s.modal__content}>
          <h3 className={s.modal__title} onClick={onFormClose}>
            Новое объявление
          </h3>
          <div className={s.modal__btn_close} onClick={onFormClose}>
            <div className={s.modal__btn_close_line}></div>
          </div>
          <form
            className={cn(s.modal__form_newArt, s.form_newArt)}
            id="formNewArt"
            action="#"
            onSubmit={handleAddProduct}
          >
            <div className={s.form_newArt__block}>
              <label htmlFor="name">Название</label>
              <input
                className={s.form_newArt__input}
                type="text"
                name="name"
                id="formName"
                placeholder="Введите название"
                onChange={(event) => {
                  setTitle(event.target.value);
                  setErrorText("");
                }}
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
                onChange={(event) => {
                  setDescription(event.target.value);
                  setErrorText("");
                }}
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
              <label htmlFor="price">Цена</label>
              <input
                className={s.form_newArt__input_price}
                type="text"
                name="price"
                id="formName"
                onChange={(event) => {
                  setPrice(event.target.value);
                  setErrorText("");
                }}
              />
              <div className={s.form_newArt__input_price_cover}></div>
            </div>

            <button
              className={cn(s.form_newArt__btn_pub, s.btn_hov02)}
              id="btnPublish"
            >
              Опубликовать
            </button>
            <div className={s.error_box}>
              <p className={s.error_text}>{errorText}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
