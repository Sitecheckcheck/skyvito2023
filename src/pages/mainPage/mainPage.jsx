import { Header } from "../../components/header/header";
import { ProductsBox } from "../../components/productsBox/productsBox";
import { Search } from "../../components/seach/search";
import { Footer } from "../../components/footer/footer";

export const MainPage = () => {


  return (
    <>
      <Header isAllowed={false} page="main" />
      <Search page="main" />
      <ProductsBox />
      <Footer />
    </>
  );
};
