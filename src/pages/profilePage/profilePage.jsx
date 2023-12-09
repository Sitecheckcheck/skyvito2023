import { Header } from "../../components/header/header";
import { ProductsBox } from "../../components/productsBox/productsBox";

import { Footer } from "../../components/footer/footer";
import s from "./profilePage.module.css";
import { MainMenu } from "../../components/mainMenu/mainMenu";
import { ProfileSettings } from "../../components/profileSettings/profileSettings";

export const ProfilePage = () => {
  const userName = "Антон";

  return (
    <>
      <Header isAllowed={true} />
      <div className={s.main__container}>
        <div className={s.main__center_block}>
          <MainMenu />
          <h2 className={s.main__h2}>Здравствуйте, {userName}!</h2>
          <ProfileSettings />
        </div>
        <div className={s.main__content}>
          <ProductsBox TitleBox="Мои товары" />
        </div>
      </div>

      <Footer />
    </>
  );
};
