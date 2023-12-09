import { Header } from "../../components/header/header";
import { ProductsBox } from "../../components/productsBox/productsBox";

import { Footer } from "../../components/footer/footer";
import s from "./sellerProfilePage.module.css";
import { MainMenu } from "../../components/mainMenu/mainMenu";
import { SellerProfile } from "../../components/sellerProfile/sellerProfile";

export const SellerProfilePage = () => {

  return (
    <>
      <Header isAllowed={true} />
      <div className={s.main__container}>
        <div className={s.main__center_block}>
          <MainMenu />
          <h2 className={s.main__h2}>Профиль продавца</h2>
          <SellerProfile />
        </div>
        <div className={s.main__content}>
          <ProductsBox TitleBox="Товары продавца" />
        </div>
      </div>

      <Footer />
    </>
  );
};
