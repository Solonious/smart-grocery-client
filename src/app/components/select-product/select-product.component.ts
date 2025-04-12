import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { addOutline, cartOutline, removeOutline } from 'ionicons/icons';
import { HttpService } from '../../services/http.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Observable, switchMap, tap } from 'rxjs';
import { Product } from '../../services/models/product.model';
import { IonToolbar, IonHeader, IonContent, IonSearchbar, IonGrid, IonRow, IonCol, IonIcon, IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonProgressBar, IonButton, IonFooter } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { ShoppingPageService } from '../shopping-page/shopping-page.service';
import { addIcons } from 'ionicons';
import { CardService } from '../../services/card/card.service';

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
  private cardService = inject(CardService);
  private httpService = inject(HttpService);
  selectedStore = inject(ShoppingPageService).selectedStore;

  constructor() {
    addIcons({ cartOutline, addOutline, removeOutline });
  }
  
  activeProductId = signal<string>('');
  
  quantity = signal(0);

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

        return this.httpService.searchProducts(searchTerm);
      }),
      map((products: Product[]) => {
        return products.map((product: Product) => ({
          ...product,
          isInCard: false,
          quantity: 0,
          image: product.image || 'assets/default-image.png' // Default image if none provided
        }));
      }),
      tap(() => this.isLoading = false)
    );
  }

  onSearchClear() {
    this.searchFromControl.setValue('');
  }

  increase(ev: Event) {
    ev.stopPropagation();
    this.quantity.update((prev) => prev + 1);
  }

  decrease(ev: Event) {
    ev.stopPropagation();
    this.quantity.update((prev) => prev - 1);
    if (this.quantity() < 0) {
      this.quantity.set(0);     
  }
}

  isProductInCart(productId: string): boolean {
    return this.cardService.isProductInCard(productId);
  }

  getSelectedProductId(id: string): string {
    return this.cardService.isProductInCard(id) ? id : '';
  }

  toggleCart(product: Product) {
    const { id, name, price } = product;

    const isInCart = this.cardService.isProductInCard(id);
    const cartItem = {id, name, price, quantity: this.quantity()
    };

    if(isInCart) {
      this.cardService.removeFromCard(id);
    } else {
      this.cardService.addToCard(cartItem);
    }
  }

  setActiveProductId(productId: string) {
    this.activeProductId.set(productId);
    this.quantity.set(1);
  }
}

