import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnDestroy {
    name: string = '';
    email: string = '';
    password: string = '';
    errorMessage = '';

  private auth = inject(AuthService);

  private router = inject(Router);

  private destroy$ = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  registerUser() {
    this.auth.register(this.name, this.email, this.password).pipe(
        takeUntil(this.destroy$)
    ).subscribe();
  }
}