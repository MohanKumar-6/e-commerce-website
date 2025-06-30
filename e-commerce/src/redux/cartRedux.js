import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.products.find(
        (p) => p._id === action.payload._id
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
      } else {
        state.products.push(action.payload);
        state.quantity += 1;
        state.total += action.payload.price * action.payload.quantity;
      }
    },
    updateQuantity: (state, action) => {
      const { productId, type } = action.payload;
      const product = state.products.find((p) => p._id === productId);

      if (!product) return;

      if (type === "inc") {
        product.quantity += 1;
        state.total += product.price;
      } else if (type === "dec" && product.quantity > 1) {
        product.quantity -= 1;
        state.total -= product.price;
      } else if (type === "dec" && product.quantity === 1) {
        state.products = state.products.filter((p) => p._id !== productId);
        state.quantity -= 1;
        state.total -= product.price;
      }
    },
  },
});

export const { addProduct, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
