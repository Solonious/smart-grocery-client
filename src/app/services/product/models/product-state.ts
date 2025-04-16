import { Product } from "../../models/product.model";

export interface ProductState {
  products: Product[];
  selectedProductId: string | null;
  cartItems: Map<string, number>; // productId -> quantity
}

export interface CartProduct extends Product {
  quantity: number;
}