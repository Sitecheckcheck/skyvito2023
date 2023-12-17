import "./App.css";
import { AppRoutes } from "./routes/routes";
import { Allowed } from "./context/isAllowed";
import { useEffect, useState } from "react";
import { useGetUserMutation } from "./store/userApi/userApi";
import { useUpdateTokensMutation } from "./store/authApi/authApi";

function App() {
  const [tokenUpdate] = useUpdateTokensMutation();
  const [getUser] = useGetUserMutation();
  const [isAllowed, setIsAllowed] = useState("");

  useEffect(() => {
    getUser(localStorage.getItem("access_token")).then((resp) => {

      if (resp.data) {
        setIsAllowed(true);
      } else if (resp.error.status === 401) {
        console.log({
          access_token: localStorage.getItem("access_token"),
          refresh_token: localStorage.getItem("refresh_token"),
        })
        tokenUpdate({
          access_token: localStorage.getItem("access_token"),
          refresh_token: localStorage.getItem("refresh_token"),
        }).then((resp) => {

          if (resp.data) {
            getUser(resp.access_token).then((user) => {
              if (user.data) {
                setIsAllowed(true);
              } else {
                setIsAllowed(false);
              }
            });
          } else {
            setIsAllowed(false);
          }
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Allowed.Provider value={{ isAllowed, setIsAllowed }}>
      <div className="App">
        <AppRoutes />
      </div>
    </Allowed.Provider>
  );
}

export default App;
