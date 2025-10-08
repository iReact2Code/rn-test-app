export type Product = {
  id: string;
  title: string;
  description: string;
  price: number; // in USD for demo
  image: string; // URL or require() path
};

export type CartItem = {
  product: Product;
  quantity: number;
};
