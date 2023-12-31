import { Header } from "../../components/header/header";
import { ProductsBox } from "../../components/productsBox/productsBox";

import { Footer } from "../../components/footer/footer";
import s from "./sellerProfilePage.module.css";
import { MainMenu } from "../../components/mainMenu/mainMenu";
import { SellerProfile } from "../../components/sellerProfile/sellerProfile";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useGetAllProductsQuery } from "../../store/productsApi";

export const SellerProfilePage = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);

  const { data, isLoading } = useGetAllProductsQuery();
  const products = data?.filter((item) => item.user_id === Number(query.id));

  const userName = query.name ? query.name : "Пользователь";

  if (isLoading)
    return (
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h1>
    );

  return (
    <>
      <Header isAllowed={true} />
      <div className={s.main__container}>
        <div className={s.main__center_block}>
          <MainMenu />
          <h2 className={s.main__h2}>Профиль продавца</h2>
          <SellerProfile
            name={userName}
            surname={query.surname}
            city={query.city}
            sells_from={query.sells_from}
            phone={query.phone}
            avatar={query.avatar}
          />
        </div>
        <div className={s.main__content}>
          <ProductsBox TitleBox="Товары продавца" products={products} />
        </div>
      </div>

      <Footer />
    </>
  );
};
