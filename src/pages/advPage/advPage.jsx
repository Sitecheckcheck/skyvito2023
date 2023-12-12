import cn from "classnames";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import s from "./advPage.module.css";
import { MainMenu } from "../../components/mainMenu/mainMenu";
import { ProductArticle } from "../../components/productArticle/productArticle";
import { useGetOneProductQuery } from "../../store/oneProductApi/oneProductApi";
import { useLocation } from "react-router-dom";
import queryString from 'query-string';

export const AdvPage = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);
  const product = useGetOneProductQuery(query.id);
  const productData = product.status === 'fulfilled' ? product.data : ''
 
  return (
    <>
      <Header isAllowed={true} />
      <div className={s.main}>
        <MainMenu />
        {productData ? <ProductArticle product={productData} /> : <div>Loading...</div>}
        <div className={s.main__container}>
          <h3 className={cn(s.main__title, s.title)}>Описание товара</h3>
          <div className={s.main__content}>
            <p className={s.main__text}>
              {productData?.description}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
