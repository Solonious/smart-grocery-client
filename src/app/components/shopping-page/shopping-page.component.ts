import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonIcon, IonBadge, IonButton } from "@ionic/angular/standalone";
import { ReactiveFormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { cartOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShoppingPageService } from './shopping-page.service';
import { CardService } from '../../services/card/card.service';

@Component({
  selector: 'app-search-page',
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

  cardService = inject(CardService);

  cardItemsLength = this.cardService.cardItemsLength;

  constructor() {
    addIcons({ cartOutline });
  }

  onCardClick() {
    this.cardService.getSelectedCardItems();
  }
}