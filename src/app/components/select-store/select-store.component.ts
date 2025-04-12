import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton } from "@ionic/angular/standalone";
import { ShoppingPageService } from '../shopping-page/shopping-page.service';
import { ShoppingStore, ShoppingStoreType } from '../../services/models/shopping-store';

@Component({
  selector: 'app-select-store',
  imports: [IonButton, ],
  templateUrl: './select-store.component.html',
  styleUrl: './select-store.component.css'
})
export class SelectStoreComponent {

  shoppingStores = Object.values(ShoppingStore); 

  private router = inject(Router);

  private shoppingPageService = inject(ShoppingPageService);

  onButtonClick(store: ShoppingStoreType): void {
    this.shoppingPageService.selectedStore.set(store);
    this.router.navigate(['shopping/select-product']);
  }
}
