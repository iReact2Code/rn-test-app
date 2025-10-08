import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../../types';

export type CartState = {
  items: Record<string, CartItem>;
};

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existing = state.items[product.id];
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items[product.id] = {
          product,
          quantity: 1,
        };
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity = Math.max(0, quantity);
        if (state.items[id].quantity === 0) {
          delete state.items[id];
        }
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
