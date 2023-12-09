import s from "./articleButton.module.css";
import cn from "classnames";

export const ArticleButton = ({ page }) => {
  return (
    <div className={s.article__btn_block}>
      {page !== "product" ? (
        <>
          <button className={cn(s.article__btn, s.btn_redact, s.btn_hov02)}>
            Редактировать
          </button>
          <button className={cn(s.article__btn, s.btn_remove, s.btn_hov02)}>
            Снять с публикации
          </button>
        </>
      ) : (
        <button className={cn(s.article__btn1, s.btn_hov02)}>
          Показать&nbsp;телефон
          <span>8&nbsp;905&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span>
        </button>
      )}
    </div>
  );
};
