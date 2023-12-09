import { Header } from "../../components/header/header";
import { ProductsBox } from "../../components/productsBox/productsBox";
import { Search } from "../../components/seach/search";
import { Footer } from "../../components/footer/footer";
import styles from "./mainPage.module.css";

export const MainPage = () => {
    return (
<div className={styles.wrapper}>
  <div className={styles.container}>
    <Header/>
    <Search/>
    <ProductsBox/>
    <Footer/>
  </div>
</div>
    )
}