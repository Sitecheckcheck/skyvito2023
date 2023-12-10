import { useState } from "react";
import s from "./articleButton.module.css";
import cn from "classnames";
import { createPortal } from "react-dom";
import { Modal } from "../modal/modal";
import { EditProduct } from "../../pages/editProduct/editProduct";

export const ArticleButton = ({ page }) => {
  const [isOpen, setIsOpen] = useState("");

  const getModalForm = () => {
    if (isOpen === "open") {
      return <EditProduct onFormClose={() => setIsOpen("")} />;
    }
  }

  return (
    <div className={s.article__btn_block}>
      {page !== "product" ? (
        <>
          <button className={cn(s.article__btn, s.btn_redact, s.btn_hov02)} onClick={() => setIsOpen("open")}>
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
            {createPortal(
        <Modal isOpen={isOpen}>{getModalForm()}</Modal>,
        document.body
      )}
    </div>
  );
};
