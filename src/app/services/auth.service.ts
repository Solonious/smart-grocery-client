import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpService);
  
  private router = inject(Router);
  

  login(email: string, password: string): Observable<unknown> {
    return this.http.loginUser(email, password).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      }
    ));  
  }

  register(name: string, email: string, password: string): Observable<unknown> {
    return this.http.registerUser(name, email, password).pipe(
        tap((response: any) => {
            this.router.navigate(['/home']);
        }
    ));
  }
  
  
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
