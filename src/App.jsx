import "./App.css";
import { AppRoutes } from "./routes/routes";
import { useEffect } from "react";
import { getUser } from "./api";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlise";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      const user = await getUser();

      dispatch(
        setUser({
          email: user.email,
          name: user.name,
          surname: user.surname,
          city: user.city,
          avatar: user.avatar,
          id: user.id,
          phone: user.phone,
          sells_from: user.sells_from,
        })
      );
    } catch (error) {
      console.log(error);
      if (error.mesage === "токен не рабочий") {
        navigate("/signin");
      }
      navigate("/");
    }
  };

  useEffect(() => {
    try {
      getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  }, []); // eslint-disable-line

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
