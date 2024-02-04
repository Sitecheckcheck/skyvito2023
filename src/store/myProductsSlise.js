import { createSlice } from "@reduxjs/toolkit";

const initialState = {products: []};

const myProductsSlise = createSlice({
  name: "myProducts",
  initialState,
  reducers: {
    setMyProducts(state, action) {
      const { products } = action.payload;
      state.products = products;
    },
  },
});

export const { setMyProducts } = myProductsSlise.actions;
export default myProductsSlise.reducer;