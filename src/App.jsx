import "./App.css";
import { AppRoutes } from "./routes/routes";
import { useAuth } from "./hooks/use-auth";
import { getUser } from "./api";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlise";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getCurrentUser = async () => {
    try {
      const access_token = localStorage.getItem("access_token")
      const user = await getUser(access_token);

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
        navigate("/signin");
      }
    } 
  }

  useEffect(() => {
    getCurrentUser()
  }, []) // eslint-disable-line

  const { isAllowed } = useAuth();

  return (
        <div className="App">
          <AppRoutes isAllowed={isAllowed}/>
        </div>
  );
}

export default App;
