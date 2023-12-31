import { useState } from "react";
import s from "./productArticle.module.css";
import cn from "classnames";
import { ArticleButton } from "../articleButton/articleButton";
import { createPortal } from "react-dom";
import { Reviews } from "../../pages/reviews/reviews";
import { Modal } from "../modal/modal";
import { DateBlock } from "../dateBlock/dateBlock";
import { useGetAdsCommentsQuery } from "../../store/productsApi";
import { Link } from "react-router-dom";

export const ProductArticle = ({ page = "product", product }) => {
  const [isOpen, setIsOpen] = useState("");
  const [mainImg, setMainImg] = useState(product?.images[0]?.url);
  const [numberOfShowImg, setNumberOfShowImg] = useState(1);
  const comments = useGetAdsCommentsQuery({ id: product.id });

  const getModalForm = () => {
    if (isOpen === "open") {
      return (
        <Reviews
          onFormClose={() => setIsOpen("")}
          reviews={comments.data || []}
          id={product.id}
        />
      );
    }
  };

  const handleNextImg = () => {
    if (window.innerWidth <= 768) {
      if (numberOfShowImg < product?.images.length) {
        setNumberOfShowImg(numberOfShowImg + 1);
        setMainImg(product?.images[numberOfShowImg]?.url);
      } else {
        setNumberOfShowImg(1);
        setMainImg(product?.images[0]?.url);
      }
    }
  };

  const surname = product?.user.surname ? product?.user.surname : "";
  
  return (
    <div className={s.main__artic}>
      <div className={s.artic__content}>
        <div className={s.article__left}>
          <div className={s.article__fill_img}>
            <div className={s.article__img} onClick={handleNextImg}>
              <img
                src={
                  mainImg
                    ? `http://localhost:8090/${mainImg}`
                    : "/img/no-foto.png"
                }
                alt=""
              />
            </div>

            <div className={s.article__img_bar}>
              {product?.images.map((item) => (
                <div
                  className={s.article__img_bar_div}
                  key={item.id}
                  onClick={() => setMainImg(item.url)}
                >
                  <img src={`http://localhost:8090/${item.url}`} alt="" />
                </div>
              ))}
            </div>

            <div className={cn(s.article__img_bar_mob, s.img_bar_mob)}>
              {product?.images.map((item) =>
                item.id === product?.images[numberOfShowImg - 1].id ? (
                  <div
                    className={cn(s.img_bar_mob__circle, s.circle_active)}
                    key={item.id}
                  ></div>
                ) : (
                  <div className={s.img_bar_mob__circle} key={item.id}></div>
                )
              )}
            </div>
          </div>
        </div>
        <div className={s.article__right}>
          <div className={s.article__block}>
            <h3 className={cn(s.article__title, s.title)}>{product?.title}</h3>
            <div className={s.article__info}>
              <p className={s.article__date}>
                <DateBlock time={product?.created_on} type="card" />
              </p>
              <p className={s.article__city}>{product?.user?.city}</p>
              <p className={s.article__link} onClick={() => setIsOpen("open")}>
                {comments.status === "fulfilled" &&
                  (comments?.data?.length === 0
                    ? "нет отзывов"
                    : `${comments?.data?.length} отзыва`)}
              </p>
            </div>
            <p className={s.article__price}>{product.price} ₽</p>

            <ArticleButton
              page={page}
              phone={product.user.phone}
              product={product}
            />

            <div className={cn(s.article__author, s.author)}>
              <Link
                to={`/seller-profile/?id=${product?.user.id}&name=${product?.user.name}&avatar=${product?.user.avatar}&city=${product?.user.city}&sells_from=${product?.user.sells_from}&phone=${product?.user.phone}&surname=${surname}`}
              >
                <div className={s.author__img}>
                  <img
                    src={`http://localhost:8090/${product.user.avatar}`}
                    alt=""
                  />
                </div>
              </Link>

              <div className={s.author__cont}>
                <p className={s.author__name}>{product?.user.name}</p>
                <p className={s.author__about}>
                  {`Продает товары с ${product?.user.sells_from}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {createPortal(
        <Modal isOpen={isOpen}>{getModalForm()}</Modal>,
        document.body
      )}
    </div>
  );
};
