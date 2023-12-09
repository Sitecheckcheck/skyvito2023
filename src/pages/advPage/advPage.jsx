import cn from "classnames";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import s from "./advPage.module.css";
import { MainMenu } from "../../components/mainMenu/mainMenu";
import { ProductArticle } from "../../components/productArticle/productArticle";

export const AdvPage = () => {
  return (
    <>
      <Header isAllowed={true} />
      <div className={s.main}>
        <MainMenu />
        <ProductArticle />
        <div className={s.main__container}>
          <h3 className={cn(s.main__title, s.title)}>Описание товара</h3>
          <div className={s.main__content}>
            <p className={s.main__text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
