export interface Product {
  id: string;
  description?: string;
  name: string;
  price: number;
  image: string;
  store?: string;
  url?: string;
  productKey?: string;
  isOnSale?: boolean;
  category?: string;
  isInCard?: boolean;
  quantity?: number;
}