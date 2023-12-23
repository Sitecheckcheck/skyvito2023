import "./App.css";
import { AppRoutes } from "./routes/routes";
import { useAuth } from "./hooks/use-auth";

function App() {

  const { isAllowed } = useAuth();

  return (
        <div className="App">
          <AppRoutes isAllowed={isAllowed}/>
        </div>
  );
}

export default App;
