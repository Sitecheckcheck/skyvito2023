import { useState } from "react";
import s from "./articleButton.module.css";
import cn from "classnames";
import { createPortal } from "react-dom";
import { Modal } from "../modal/modal";
import { EditProduct } from "../../pages/editProduct/editProduct";
import { useDeleteProductMutation } from "../../store/productsApi";
import { useNavigate } from "react-router-dom";

export const ArticleButton = ({ page, phone, product }) => {
  const [isOpen, setIsOpen] = useState("");
  const [showTelefone, setShowTelefone] = useState(false);
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  const getModalForm = () => {
    if (isOpen === "open") {
      return (
        <EditProduct onFormClose={() => setIsOpen("")} product={product} />
      );
    }
  };

  const handleDelete = async () => {
    const response = await deleteProduct(product.id);
    if (response.error?.status === 401) {
      navigate("/signin");
    }
    navigate("/profile");
  };

  return (
    <div className={s.article__btn_block}>
      {page !== "product" ? (
        <>
          <button
            className={cn(s.article__btn, s.btn_redact, s.btn_hov02)}
            onClick={() => setIsOpen("open")}
          >
            Редактировать
          </button>
          <button
            className={cn(s.article__btn, s.btn_remove, s.btn_hov02)}
            onClick={() => handleDelete()}
          >
            Снять с публикации
          </button>
        </>
      ) : (
        <button
          className={cn(s.article__btn1, s.btn_hov02)}
          onClick={() => setShowTelefone(true)}
        >
          {phone !== "null" ? (
            showTelefone ? (
              <h3>{phone}</h3>
            ) : (
              <>
                Показать&nbsp;телефон
                <span>{phone?.substring(0, 4)}&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span>
              </>
            )
          ) : (
            <>
              <span>нет телефона</span>
            </>
          )}
        </button>
      )}
      {createPortal(
        <Modal isOpen={isOpen}>{getModalForm()}</Modal>,
        document.body
      )}
    </div>
  );
};
