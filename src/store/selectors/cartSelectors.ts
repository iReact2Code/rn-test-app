import type { RootState } from '../index';

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartCount = (state: RootState) =>
  Object.values(state.cart.items).reduce((sum, item) => sum + item.quantity, 0);

export const selectCartSubtotal = (state: RootState) =>
  Object.values(state.cart.items).reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
