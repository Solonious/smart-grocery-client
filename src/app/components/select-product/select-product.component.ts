import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { addOutline, cartOutline, removeOutline } from 'ionicons/icons';
import { HttpService } from '../../services/http.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Observable, switchMap, tap } from 'rxjs';
import { Product } from '../../services/models/product.model';
import { IonToolbar, IonHeader, IonContent, IonSearchbar, IonGrid, IonRow, IonCol, IonIcon, IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonProgressBar, IonButton, IonFooter } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { ShoppingPageService } from '../shopping-page/shopping-page.service';
import { addIcons } from 'ionicons';
import { ProductService } from '../../services/product/product.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-select-product',
  imports: [IonFooter, IonButton, IonProgressBar, 
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle, 
    IonCardHeader,
    IonImg,
    IonCard,
    IonIcon,
    IonCol, 
    IonRow, 
    IonGrid, 
    IonSearchbar, 
    IonContent, 
    IonHeader, 
    IonToolbar,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './select-product.component.html',
  styleUrl: './select-product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectProductComponent {
  private productService = inject(ProductService);
  private httpService = inject(HttpService);
  selectedStore = inject(ShoppingPageService).selectedStore;

  // Signals from ProductService
  products = this.productService.products;
  selectedProductId = this.productService.selectedProductId;
  cartItems = this.productService.cartItems;
  cartItemsCount = this.productService.cartItemsCount;

  // Track selected quantity before adding to cart
  private selectedQuantity = signal(1);

  constructor() {
    addIcons({ cartOutline, addOutline, removeOutline });
  }

  isLoading = false;
  searchFromControl = new FormControl<string>('');
  products$!: Observable<Product[]>;

  ngOnInit() {
    this.products$ = this.searchFromControl.valueChanges.pipe(
      debounceTime(300),
      filter((value): value is string => value !== null),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => {
        this.isLoading = true;
        return this.productService.searchProducts(searchTerm);
      }),
      map((products: Product[]) => {
        return products.map((product: Product) => ({
          ...product,
          image: product.image || 'assets/default-image.png'
        }));
      }),
      tap(() => this.isLoading = false)
    );
  }

  onSearchClear() {
    this.searchFromControl.setValue('');
  }

  setActiveProductId(productId: string) {
    this.productService.setSelectedProduct(productId);
    this.selectedQuantity.set(1); // Reset quantity when selecting new product
  }

  getSelectedQuantity(): number {
    return this.selectedQuantity();
  }

  updateSelectedQuantity(delta: number, event?: Event) {
    event?.stopPropagation();
    const newQuantity = this.selectedQuantity() + delta;
    if (newQuantity > 0) {
      this.selectedQuantity.set(newQuantity);
    }
  }

  getQuantityInCart(productId: string): number {
    return this.cartItems().get(productId) || 0;
  }

  isProductInCart(productId: string): boolean {
    return this.cartItems().has(productId);
  }

  updateQuantity(productId: string, delta: number, event?: Event) {
    event?.stopPropagation();
    const currentQuantity = this.getQuantityInCart(productId);
    const newQuantity = currentQuantity + delta;
    
    if (newQuantity > 0) {
      this.productService.updateCartItemQuantity(productId, newQuantity);
    } else {
      this.productService.removeFromCart(productId);
    }
  }

  toggleCart(product: Product, event?: Event) {
    event?.stopPropagation();
    const productId = product.id;
    if (this.isProductInCart(productId)) {
      this.productService.removeFromCart(productId);
    } else {
      this.productService.addToCart(productId, this.selectedQuantity());
    }
  }
}

