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
    removeProduct: (state, action) => {
      const productId = action.payload;
      const product = state.products.find((p) => p._id === productId);
      
      if (product) {
        // Subtract the total price of all quantities of this product
        state.total -= product.price * product.quantity;
        // Remove the product from the cart
        state.products = state.products.filter((p) => p._id !== productId);
        // Decrease the unique product count by 1
        state.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, updateQuantity, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;