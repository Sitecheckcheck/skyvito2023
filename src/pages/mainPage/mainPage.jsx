import { Header } from "../../components/header/header";
import { ProductsBox } from "../../components/productsBox/productsBox";
import { Search } from "../../components/seach/search";
import { Footer } from "../../components/footer/footer";
import { useGetAllProductsQuery } from "../../store/productsApi";
import { useState } from "react";

export const MainPage = () => {
  const { data, isLoading } = useGetAllProductsQuery();
  const [productsShow, setProductsShow] = useState(data);

  if (isLoading)
    return (
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h1>
    );

  return (
    <>
      <Header page="main" />
      <Search page="main" products={data} setProductsShow={setProductsShow} />
      <ProductsBox products={productsShow ? productsShow : data} />
      <Footer />
    </>
  );
};
