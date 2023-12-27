import { useEffect, useState } from "react";
import s from "./reviews.module.css";
import cn from "classnames";
import { useCreateCommentMutation } from "../../store/productsApi";
import { useNavigate } from "react-router-dom";
import { DateBlock } from "../../components/dateBlock/dateBlock";
import { useAuth } from "../../hooks/use-auth";

export const Reviews = ({ onFormClose, reviews, id }) => {
  const [textComment, setTextComment] = useState("");
  const [errorText, setErrorText] = useState("");
  const [createComment] = useCreateCommentMutation();
  const { isAllowed } = useAuth();
  const navigate = useNavigate();
  const [activButton, setActivButton] = useState(false);

  useEffect(() => {
    if (!textComment) {
      setActivButton(false);
    } else {
      setActivButton(true)
    }
  }, [textComment]);

  const addComment = async () => {
    const response = await createComment({ id: id, textComment: textComment });
    if (response.error?.status === 401) {
      navigate("/signin");
    }
    onFormClose();
  };

  return (
    <div className={s.container_bg}>
      <div className={s.modal__block}>
        <div className={s.modal__content}>
          <h3 className={s.modal__title} onClick={onFormClose}>
            Отзывы о товаре
          </h3>
          <div className={s.modal__btn_close} onClick={onFormClose}>
            <div className={s.modal__btn_close_line}></div>
          </div>
          <div className={s.modal__scroll}>
            {isAllowed ? (
              <div className={cn(s.modal__form_newArt, s.form_newArt)}>
                <div className={s.form_newArt__block}>
                  <label htmlFor="text">Добавить отзыв</label>
                  <textarea
                    className={s.form_newArt__area}
                    name="text"
                    id="formArea"
                    cols="auto"
                    rows="5"
                    placeholder="Введите описание"
                    value={textComment}
                    onChange={(event) => {
                      setTextComment(event.target.value);
                      setErrorText("");
                    }}
                  ></textarea>
                </div>
                <button
                  className={!activButton ? cn(s.form_newArt__btn_pub) : cn(s.form_newArt__btn_pub_activ, s.btn_hov02)}
                  id="btnPublish"
                  onClick={addComment}
                  disabled={!activButton}
                >
                  Опубликовать
                </button>
                <div className={s.error_box}>
                  <p className={s.error_text}>{errorText}</p>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className={cn(s.modal__reviews)}>
              {reviews?.map((item) => (
                <div className={cn(s.reviews__review)} key={item.id}>
                  <div className={s.review__item}>
                    <div className={s.review__left}>
                      <div className={s.review__img}>
                        <img
                          src={`http://localhost:8090/${item.author.avatar}`}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={s.review__right}>
                      <p className={cn(s.review__name, s.font_t)}>
                        {item.author.name ? item.author.name : "без имени"}{" "}
                        <span>
                          <DateBlock time={item.created_on} type="card" />
                        </span>
                      </p>
                      <h5 className={cn(s.review__title, s.font_t)}>
                        Комментарий
                      </h5>
                      <p className={cn(s.review__text, s.font_t)}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
