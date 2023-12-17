import { Header } from "../../components/header/header";
import { ProductsBox } from "../../components/productsBox/productsBox";
import { Search } from "../../components/seach/search";
import { Footer } from "../../components/footer/footer";
// import { useAddUserMutation, useGetTokensQuery, useGetUserQuery, useUpdateTokensQuery } from "../../store/userApi/userApi";


export const MainPage = () => {

  

  // const {data} = useGetTokensQuery({
  //   email: "pasha@mail.ru",
  //   password: "pasha123"
  // })

//   useUpdateTokensQuery({
//     access_token: data?.access_token,
//   refresh_token: data?.refresh_token,
// })

  // const [registration] = useAddUserMutation();
  // const {data} = useGetUserQuery(tokens?.access_token);

  // const handlToken = async () => {
  //   await tokens()
  // }

  
  



  return (
    <>
      <Header page="main" />
      <Search page="main" />
      <ProductsBox />
      <Footer />
    </>
  );
};
