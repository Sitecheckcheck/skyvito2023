import { Header } from "../../components/header/header";
import { ProductsBox } from "../../components/productsBox/productsBox";
import { Search } from "../../components/seach/search";
import { Footer } from "../../components/footer/footer";
import { useGetAllProductsQuery } from "../../store/productsApi";

export const MainPage = () => {
  const { data, isLoading } = useGetAllProductsQuery();

  if (isLoading)
    return (
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h1>
    );

  return (
    <>
      <Header page="main" />
      <Search page="main" />
      <ProductsBox products={data} />
      <Footer />
    </>
  );
};
