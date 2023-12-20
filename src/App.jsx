import "./App.css";
import { AppRoutes } from "./routes/routes";
import { useAuth } from "./hooks/use-auth";
import { getUser } from "./api";

function App() {

  const { isAllowed, access_token, refresh_token } = useAuth();
  getUser(access_token)
  // .then((res) => {
  //   console.log(res)
  // })

  return (
        <div className="App">
          <AppRoutes isAllowed={isAllowed}/>
        </div>
  );
}

export default App;
