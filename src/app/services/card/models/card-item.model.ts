import { Product } from "../../models/product.model";

export interface CardItem extends Pick<Product, "id" | "name" | "price"> {
    quantity: number;
}