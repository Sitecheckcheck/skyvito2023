import "./App.css";
import { AppRoutes } from "./routes/routes";
import { getUser, refreshTokens } from "./api";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlise";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
      if (error.message === "токен не рабочий") {
        try {
          const tokens = await refreshTokens();
          localStorage.setItem("access_token", tokens.access_token);
          localStorage.setItem("refresh_token", tokens.refresh_token);
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
          navigate("/signin");
        }
      } else {
        navigate("/signin");
      }
    }
  };
  
  useEffect(() => {
    getCurrentUser();
  }, []); // eslint-disable-line

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
