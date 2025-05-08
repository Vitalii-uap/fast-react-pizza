import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQty(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQty(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) {
        state.cart = state.cart.filter((i) => i.pizzaId !== action.payload);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQty,
  decreaseItemQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Базові селектори
export const getCart = (state) => state.cart.cart;
export const getUserName = (state) => state.user.username;

// Мемоізовані селектори
export const getTotalCartQuantity = createSelector([getCart], (cart) =>
  cart.reduce((sum, item) => sum + item.quantity, 0),
);

export const getTotalCartPrice = createSelector([getCart], (cart) =>
  cart.reduce((sum, item) => sum + item.totalPrice, 0),
);

export const getCurrentQuantityById = (id) =>
  createSelector(
    [getCart],
    (cart) => cart.find((item) => item.pizzaId === id)?.quantity || 0,
  );
