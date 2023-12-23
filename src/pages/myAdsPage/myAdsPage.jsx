import cn from "classnames";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import s from "./myAdsPage.module.css";
import { MainMenu } from "../../components/mainMenu/mainMenu";
import { ProductArticle } from "../../components/productArticle/productArticle";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useGetOneProductQuery } from "../../store/productsApi/productsApi";

export const MyAdsPage = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);
  const product = useGetOneProductQuery(query.id);
  const productData = product.status === "fulfilled" ? product.data : "";

  return (
    <>
      <Header />
      <div className={s.main}>
        <MainMenu />
        {productData ? (
          <>
            <ProductArticle product={productData} page="my-product" />
            <div className={s.main__container}>
              <h3 className={cn(s.main__title, s.title)}>Описание товара</h3>
              <div className={s.main__content}>
                <p className={s.main__text}>{productData?.description}</p>
              </div>
            </div>
          </>
        ) : (
          <h3 className={s.main__artic}>Loading...</h3>
        )}
      </div>

      <Footer />
    </>
  );
};
