import "./App.css";
import { AppRoutes } from "./routes/routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlise";
import {
  useLazyGetMeProductsQuery,
  useLazyGetUserQuery,
} from "./store/productsApi";
import { setMyProducts } from "./store/myProductsSlise";
// import { Counter } from "./components/test";

function App() {
  const dispatch = useDispatch();

  const [getUser] = useLazyGetUserQuery();
  const [getMeProducts] = useLazyGetMeProductsQuery();

  useEffect(() => {
    localStorage.getItem("access_token") &&
      getUser().then((res) => {
        res.data &&
          dispatch(
            setUser({
              email: res.data.email,
              name: res.data.name,
              surname: res.data.surname,
              city: res.data.city,
              avatar: res.data.avatar,
              id: res.data.id,
              phone: res.data.phone,
              sells_from: res.data.sells_from,
            })
          );
        getMeProducts().then((res) => {
          res.data &&
            dispatch(
              setMyProducts({
                products: res.data,
              })
            );
        });
      });
  }, []); // eslint-disable-line

  return (
    <div className="App">
      <AppRoutes />
      {/* <Counter/> */}
    </div>
  );
}

export default App;
