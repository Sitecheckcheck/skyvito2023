import { useSelector } from "react-redux";

export function useMyProducts() {
  const {
    products,
  } = useSelector((state) => state.myProducts);

  return {
    products,
  };
}
