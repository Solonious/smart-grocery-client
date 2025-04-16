import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductState, CartProduct } from './models/product-state';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5006/api/products';
  private http = inject(HttpClient);

  // State
  private state = signal<ProductState>({
    products: [],
    selectedProductId: null,
    cartItems: new Map()
  });

  // Selectors
  products = computed(() => this.state().products);
  selectedProductId = computed(() => this.state().selectedProductId);
  cartItems = computed(() => this.state().cartItems);
  
  cartItemsCount = computed(() => this.state().cartItems.size);

  cartProducts = computed(() => {
    const products = this.state().products;
    const cartItems = this.state().cartItems;
    const cartProducts: CartProduct[] = [];

    cartItems.forEach((quantity, productId) => {
      const product = products.find(p => p.id === productId);
      if (product) {
        cartProducts.push({ ...product, quantity });
      }
    });

    return cartProducts;
  });

  // Actions
  setProducts(products: Product[]) {
    this.state.update(state => ({
      ...state,
      products
    }));
  }

  setSelectedProduct(productId: string | null) {
    this.state.update(state => ({
      ...state,
      selectedProductId: productId
    }));
  }

  addToCart(productId: string, quantity: number = 1) {
    this.state.update(state => {
      const newCartItems = new Map(state.cartItems);
      newCartItems.set(productId, quantity);
      return {
        ...state,
        cartItems: newCartItems
      };
    });
  }

  removeFromCart(productId: string) {
    this.state.update(state => {
      const newCartItems = new Map(state.cartItems);
      newCartItems.delete(productId);
      return {
        ...state,
        cartItems: newCartItems
      };
    });
  }

  updateCartItemQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    
    this.state.update(state => {
      const newCartItems = new Map(state.cartItems);
      newCartItems.set(productId, quantity);
      return {
        ...state,
        cartItems: newCartItems
      };
    });
  }

  clearCart() {
    this.state.update(state => ({
      ...state,
      cartItems: new Map()
    }));
  }

  // API calls
  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search?query=${query}`).pipe(
      tap(products => this.setProducts(products))
    );
  }
}