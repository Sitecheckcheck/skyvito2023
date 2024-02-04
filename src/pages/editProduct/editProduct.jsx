import { useState, useRef } from "react";
import s from "./editProduct.module.css";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import {
  useAddProductImageMutation,
  useDeleteProductImageMutation,
  useUpdateProductMutation,
} from "../../store/productsApi";

export const EditProduct = ({ onFormClose, product }) => {
  const [errorText, setErrorText] = useState("");
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product?.description);
  const [price, setPrice] = useState(product?.price);
  const navigate = useNavigate();
  const [updateProduct] = useUpdateProductMutation();
  const [addImg] = useAddProductImageMutation();
  const [deleteImg] = useDeleteProductImageMutation();
  const [isLoading, setIsLoading] = useState(false);
  const filePicker = useRef(null);

  const handleDelImg = async (url) => {
    setIsLoading(true);
    await deleteImg({ id: product.id, url: url });
    setIsLoading(false);
  };

  const handleUpload = async (file) => {
    setIsLoading(true);
    const response = await addImg({ id: product.id, file: file });
    setIsLoading(false);
    if (response.error?.status === 401) {
      navigate("/signin");
    }
  };

  const handleImgAdd = (event) => {
    handleUpload(event.target.files[0]);
  };

  const handlePick = () => {
    filePicker.current.click();
  };

  const handleEditProduct = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!title || !description || !price) {
      setErrorText("Не все поля заполнены");
    } else {
      const response = await updateProduct({
        id: product.id,
        title,
        description,
        price: Number(price),
      });

      if (response.error?.status === 401) {
        navigate("/signin");
      }
      onFormClose();
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={s.container_bg}>
        <div className={s.modal__block}>
          <div className={s.modal__content}>
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

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
            onSubmit={handleEditProduct}
          >
            <div className={s.form_newArt__block}>
              <label htmlFor="name">Название</label>
              <input
                className={s.form_newArt__input}
                type="text"
                name="name"
                id="formName"
                placeholder="Введите название"
                value={title}
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
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                  setErrorText("");
                }}
              ></textarea>
            </div>
            <div className={s.form_newArt__block}>
              <label className={s.form_newArt__p} htmlFor="price">
                Фотографии товара<span>не более 5 фотографий</span>
              </label>
              <input
                className={s.hidden}
                type="file"
                ref={filePicker}
                onChange={handleImgAdd}
                accept="image/*, .png, .jpg, .gif, .web"
              ></input>

              <div className={s.form_newArt__bar_img}>
                {product?.images.length !== 0
                  ? product?.images.map((item) => (
                      <div className={s.form_newArt__img} key={item.id}>
                        <img src={`http://localhost:8090/${item.url}`} alt="" />
                        <div
                          className={s.b_pict__close}
                          onClick={() => {
                            handleDelImg(item.url);
                          }}
                        >
                          x
                        </div>
                      </div>
                    ))
                  : ""}
                <div className={s.form_newArt__img}>
                  <img src="" alt="" />
                  <div
                    className={s.form_newArt__img_cover}
                    onClick={handlePick}
                  ></div>
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
                value={price}
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
              type="submit"
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
