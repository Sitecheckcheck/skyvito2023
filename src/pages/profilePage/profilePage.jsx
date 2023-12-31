import { Header } from "../../components/header/header";
import { ProductsBox } from "../../components/productsBox/productsBox";

import { Footer } from "../../components/footer/footer";
import s from "./profilePage.module.css";
import { MainMenu } from "../../components/mainMenu/mainMenu";
import { ProfileSettings } from "../../components/profileSettings/profileSettings";
import { useAuth } from "../../hooks/use-auth";
import { useMyProducts } from "../../hooks/use-myProducts";
// import { useLazyGetMeProductsQuery } from "../../store/productsApi";
// import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const { name } = useAuth();
  const { products } = useMyProducts();
  // const { data, isLoading, error } = useLazyGetMeProductsQuery();

  // const navigate = useNavigate();
  const userName = name ? name : "Пользователь";

  // if (isLoading)
  //   return (
  //     <h1 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h1>
  //   );

  // if (!isLoading && error?.status === 401) {
  //   navigate("/signin");
  // }

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
          <ProductsBox TitleBox="Мои товары" products={products}/>
        </div>
      </div>

      <Footer />
    </>
  );
};
