import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, redirectPath = "/skyvito2023", isAllowed }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return children;
};
