export type Product = {
  id: string;
  name: string;
  size: string;
  price: number;
  cost: number;
  stock: number;
  offerQty: number;
  offerPrice: number;
  lowStock: number;
  image: string;
};
export type CartItem = { id: string; qty: number };
export type Order = {
  id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    zone: string;
    email?: string;
  };
  items: {
    productId: string;
    name: string;
    size: string;
    qty: number;
    price: number;
  }[];
  subtotal: number;
  delivery: number;
  total: number;
  status: string;
  createdAt: string;
};
export const statuses = [
  "Pending",
  "Confirmed",
  "Processing",
  "Out for Delivery",
  "Delivered",
];
