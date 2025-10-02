import { Product } from "./product";

export interface Buy {
  id: number;
  product?: Product;   // relación con el producto
  quantity: number;
  date: string;
  totalPrice: number;
}
