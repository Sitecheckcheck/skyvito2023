import { useEffect, useState } from "react";
import { useAddProductTextMutation } from "../../store/productsApi";
import s from "./addProduct.module.css";
import cn from "classnames";
import { useNavigate } from "react-router-dom";

export const AddProduct = ({ onFormClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  const [addProductText, { isLoading }] = useAddProductTextMutation();
  const [activButton, setActivButton] = useState(false);

  useEffect(() => {
    if (!title || !description || !price) {
      setActivButton(false);
    } else {
      setActivButton(true)
    }
  }, [title, description, price]);

  if (isLoading)
    return (
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h1>
    );

  const handleAddProduct = async (event) => {
    event.preventDefault();

    if (!title || !description || !price) {
      setErrorText("Не все поля заполнены");
    } else {
      const access = localStorage.getItem("access_token");
      const response = await addProductText({
        access,
        title,
        description,
        price,
      });
      console.log(response)
      if (response.error?.status === 422) {
        setErrorText("введены не корректные данные");
      } else {
        navigate(`/my-ads/?id=${response.data?.id}`)
      }
    }
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
                Фотографии товара можно добавить на странице редактирования объявления
              </p>
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
              className={!activButton ? cn(s.form_newArt__btn_pub) : cn(s.form_newArt__btn_pub_activ, s.btn_hov02)}
              id="btnPublish"
              type="submit"
              disabled={!activButton}
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
