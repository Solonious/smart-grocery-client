import { computed, Injectable, signal } from '@angular/core';
import { CardItem } from './models/card-item.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private selectedCardItems = signal<CardItem[]>([]);

  cardItemsLength = computed(() => this.selectedCardItems().length);

  addToCard(item: CardItem) {
    const existingItem = this.selectedCardItems().find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.selectedCardItems.update(items => [...items, item]);
    }
  }

  getSelectedCardItems() {
    console.log('Selected card items:', this.selectedCardItems());
    return this.selectedCardItems();
  }

  updateCardItemQuantity(itemId: string, quantity: number) {
    this.selectedCardItems.update(items => {
      const itemIndex = items.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        const updatedItem = { ...items[itemIndex], quantity };
        return [...items.slice(0, itemIndex), updatedItem, ...items.slice(itemIndex + 1)];
      }
      return items;
    });
  }

  removeFromCard(itemId: string) {
    this.selectedCardItems.update(items => items.filter(item => item.id !== itemId));
  }

  clearCard() {
    this.selectedCardItems.set([]);
  }

  isProductInCard(productId: string): boolean {
    return this.selectedCardItems().some(item => item.id === productId);
  }

}
