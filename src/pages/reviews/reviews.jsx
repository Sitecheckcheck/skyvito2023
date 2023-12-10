import s from "./reviews.module.css";
import cn from "classnames";

export const Reviews = () => {
  const reviews = [
    {
      userImg: "/img/ggg",
      userName: "Олег",
      date: "14 августа",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    },
    {
      userImg: "/img/ggg",
      userName: "Вася",
      date: "15 августа",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      userImg: "/img/ggg",
      userName: "Алеша",
      date: "16 августа",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];
  return (
    <div className={s.container_bg}>
      <div className={s.modal__block}>
        <div className={s.modal__content}>
          <h3 className={s.modal__title}>Отзывы о товаре</h3>
          <div className={s.modal__btn_close}>
            <div className={s.modal__btn_close_line}></div>
          </div>
          <div className={s.modal__scroll}>
            <form
              className={cn(s.modal__form_newArt, s.form_newArt)}
              id="formNewArt"
              action="#"
            >
              <div className={s.form_newArt__block}>
                <label for="text">Добавить отзыв</label>
                <textarea
                  className={s.form_newArt__area}
                  name="text"
                  id="formArea"
                  cols="auto"
                  rows="5"
                  placeholder="Введите описание"
                ></textarea>
              </div>
              <button
                className={cn(s.form_newArt__btn_pub, s.btn_hov02)}
                id="btnPublish"
              >
                Опубликовать
              </button>
            </form>

            <div className={cn(s.modal__reviews)}>
              {reviews?.map((item) => (
                <div className={cn(s.reviews__review)}>
                  <div className={s.review__item}>
                    <div className={s.review__left}>
                      <div className={s.review__img}>
                        <img src="" alt="" />
                      </div>
                    </div>
                    <div className={s.review__right}>
                      <p className={cn(s.review__name, s.font_t)}>
                        {item.userName} <span>{item.date}</span>
                      </p>
                      <h5 className={cn(s.review__title, s.font_t)}>
                        Комментарий
                      </h5>
                      <p className={cn(s.review__text, s.font_t)}>
                        {item.comment}
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
