export type Offer = {
  id: string;
  productId: string;
  title: string;
  description?: string;
  price: number; // discounted final price
  endsAt: string; // ISO string
};

// Simple mock offers; endsAt is set relative to when this module is loaded
const inHours = (h: number) =>
  new Date(Date.now() + h * 3600 * 1000).toISOString();

export const OFFERS: Offer[] = [
  {
    id: 'o1',
    productId: 'p1',
    title: 'Flash Sale: Classic Tee',
    description: 'Limited-time 30% off',
    price: 13.99,
    endsAt: inHours(12),
  },
  {
    id: 'o2',
    productId: 'p3',
    title: 'Daily Deal: Sneakers',
    description: 'Save big today only',
    price: 59.99,
    endsAt: inHours(36),
  },
];
