import { Injectable, signal } from '@angular/core';
import { ShoppingStoreType } from '../../services/models/shopping-store';
import { Product } from '../../services/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingPageService {
  selectedStore = signal<ShoppingStoreType | null>(null);

  selectedProducts = signal<Product[]>([]);
}
