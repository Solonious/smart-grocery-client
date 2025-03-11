import { CommonModule } from "@angular/common";
import { Component, inject, OnDestroy } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { BehaviorSubject, filter, Subject, tap, takeUntil } from "rxjs";
import { Product } from "../../services/models/product.model";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-home',
    standalone: true,   // :white_check_mark: Встановлюємо standalone: true
    imports: [CommonModule, FormsModule],   // :white_check_mark: Імпортуємо RouterModule тут
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
    query = '';

    private http = inject(HttpService);

    private productsSource = new BehaviorSubject<Product[]>([]);

    readonly products$ = this.productsSource.asObservable();

    private destroy$ = new Subject<void>();

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    search() {
        if (!this.query.trim()) return;

        this.http
            .searchProducts(this.query).pipe(
                takeUntil(this.destroy$),
                filter((data) => !!data),
                tap((data) => this.productsSource.next(data))
            )
            .subscribe();
    }

}