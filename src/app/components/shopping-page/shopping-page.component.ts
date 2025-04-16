import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonIcon, IonBadge, IonButton } from "@ionic/angular/standalone";
import { ReactiveFormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { cartOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShoppingPageService } from './shopping-page.service';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-shopping-page',
  imports: [IonButton, IonBadge, IonIcon, IonBackButton, IonButtons, 
    IonContent, 
    IonTitle,
    IonToolbar,
    IonHeader,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  providers: [ShoppingPageService],
  templateUrl: './shopping-page.component.html',
  styleUrl: './shopping-page.component.css'
})
export class ShoppingPageComponent {
  productService = inject(ProductService);
  cartItemsCount = this.productService.cartItemsCount;
  cartProducts = this.productService.cartProducts;

  constructor() {
    addIcons({ cartOutline });
  }

  onCartClick() {
    console.log('Cart products:', this.cartProducts());
  }
}