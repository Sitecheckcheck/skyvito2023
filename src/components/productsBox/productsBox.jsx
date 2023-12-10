import s from "./productsBox.module.css";
import { ProductCard } from "../productCard/productCard";

export const ProductsBox = ({ TitleBox = "Объявления" }) => {
  return (
    <div className={s.main__container}>
      <h2 className={s.main__h2}>{TitleBox}</h2>
      <div className={s.main__content}>
        <div className={s.cards}>
          <ProductCard TitleBox={TitleBox} />
        </div>
      </div>
    </div>
  );
};
