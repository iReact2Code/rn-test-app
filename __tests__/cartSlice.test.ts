import reducer, {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from '../src/store/slices/cartSlice';
import {
  selectCartCount,
  selectCartSubtotal,
} from '../src/store/selectors/cartSelectors';

const product = {
  id: 'p1',
  title: 'Test',
  description: 'd',
  price: 10,
  image: '',
};

describe('cartSlice', () => {
  it('adds items to cart and increments quantity', () => {
    let state = reducer(undefined, { type: 'init' } as any);
    state = reducer(state, addToCart(product));
    state = reducer(state, addToCart(product));
    expect(state.items.p1.quantity).toBe(2);
  });

  it('updates quantity and removes when zero', () => {
    let state = reducer(undefined, { type: 'init' } as any);
    state = reducer(state, addToCart(product));
    state = reducer(state, updateQuantity({ id: 'p1', quantity: 0 }));
    expect(state.items.p1).toBeUndefined();
  });

  it('removes by id', () => {
    let state = reducer(undefined, { type: 'init' } as any);
    state = reducer(state, addToCart(product));
    state = reducer(state, removeFromCart('p1'));
    expect(state.items.p1).toBeUndefined();
  });

  it('clears cart', () => {
    let state = reducer(undefined, { type: 'init' } as any);
    state = reducer(state, addToCart(product));
    state = reducer(state, clearCart());
    expect(Object.keys(state.items)).toHaveLength(0);
  });

  it('selectors compute count and subtotal', () => {
    let state = reducer(undefined, { type: 'init' } as any);
    state = reducer(state, addToCart(product));
    state = reducer(state, addToCart(product));
    const root = { cart: state } as any;
    expect(selectCartCount(root)).toBe(2);
    expect(selectCartSubtotal(root)).toBe(20);
  });
});
