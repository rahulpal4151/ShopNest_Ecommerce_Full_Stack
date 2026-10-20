import { createSlice } from '@reduxjs/toolkit';

export const getCartStorageKey = (userId) => `cartItems:${userId}`;

export const getCartForUser = (userId) => {
  if (!userId) return [];

  const storedCart = localStorage.getItem(getCartStorageKey(userId));
  if (!storedCart) return [];

  const cartItems = JSON.parse(storedCart);
  return Array.isArray(cartItems) ? cartItems : [];
};

const getInitialState = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const userId = userInfo?._id || null;

  return {
    userId,
    cartItems: getCartForUser(userId),
  };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialState(),
  reducers: {
    setCartForUser: (state, action) => {
      state.userId = action.payload.userId || null;
      state.cartItems = Array.isArray(action.payload.cartItems) ? action.payload.cartItems : [];
    },
    addToCart: (state, action) => {
      if (!state.userId) return;

      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.productId === item.productId);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.productId === existItem.productId ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem(getCartStorageKey(state.userId), JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      if (!state.userId) return;

      state.cartItems = state.cartItems.filter((x) => x.productId !== action.payload);
      localStorage.setItem(getCartStorageKey(state.userId), JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      if (state.userId) {
        localStorage.removeItem(getCartStorageKey(state.userId));
      }
    },
    deactivateCart: (state) => {
      state.cartItems = [];
      state.userId = null;
    }
  },
});

export const { setCartForUser, addToCart, removeFromCart, clearCart, deactivateCart } = cartSlice.actions;
export default cartSlice.reducer;