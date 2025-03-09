import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // :white_check_mark: Додаємо FormsModule
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Product } from './services/models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // :white_check_mark: Імпортуємо FormsModule тут
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  query = '';

  products: Product[] = [];

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5006/api/products';

  search() {
    if (!this.query.trim()) return;
    this.http
      .get<Product[]>(`${this.apiUrl}/search?query=${this.query}`)
      .subscribe((data) => (this.products = data));
  }
}