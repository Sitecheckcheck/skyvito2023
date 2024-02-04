import { useSelector } from "react-redux";

export function useAuth() {
  const {
    email,
    name,
    surname,
    city,
    avatar,
    phone,
    sells_from,
    id,
  } = useSelector((state) => state.user);

  return {
    isAllowed: !!email,
    email,
    name,
    surname,
    city,
    avatar,
    id,
    phone,
    sells_from,
  };
}
