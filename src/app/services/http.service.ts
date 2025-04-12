import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { Product } from "./models/product.model";
import { HttpClient } from "@angular/common/http";

const apiProfuctsUrl = 'http://localhost:5006/api/products';
const apiAuthUrl = 'http://localhost:5006/api/auth';

@Injectable({
  providedIn: "root",
})
export class HttpService {

    private http = inject(HttpClient);
    
    searchProducts(query: string): Observable<Product[]> {
        return this.http.get<Product[]>(`${apiProfuctsUrl}/search?query=${query}`).pipe(
            map((data) => data),
            catchError((error) => {
                console.error('Error:', error);
                return [];
            })
        );
    }

    registerUser(name: string, email: string, password: string): Observable<any> {
        return this.http.post(`${apiAuthUrl}/register`, { name, email, password }).pipe(
            map((response) => response),
            catchError((error) => {
                console.error('Error:', error);
                return [];
            }));
    }
            

    loginUser(email: string, password: string): Observable<any> {
        return this.http.post(`${apiAuthUrl}/login`, { email, password }).pipe(
            map((response) => response),
            catchError((error) => {
                console.error('Error:', error);
                return [];
            }));
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${apiProfuctsUrl}/products`).pipe(
            map((data) => data),
            catchError((error) => {
                console.error('Error:', error);
                return [];
            })
        );
    }

    getProductById(id: string): Observable<Product> {
        return this.http.get<Product>(`${apiProfuctsUrl}/${id}`).pipe(
            map((data) => data),
            catchError((error) => {
                console.error('Error:', error);
                return [];
            })
        );
    }
}