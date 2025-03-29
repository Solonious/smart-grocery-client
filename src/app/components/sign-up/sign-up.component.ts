import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subject, take, takeUntil } from 'rxjs';
import { IonContent, IonList, IonItem, IonLabel, IonIcon, IonButton, IonInput } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { eyeOff } from 'ionicons/icons';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [IonButton, IonIcon, IonLabel, IonItem, IonList, IonInput, IonContent, CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SignUpComponent implements OnDestroy {
  private formBuilder = inject(FormBuilder);
  
  private router = inject(Router);

  private auth = inject(AuthService);

  signUpFrom: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  isSubmitted = false;
  passwordType = 'password';
  passwordIcon = 'eye-off';

  get errorControl() {
    return this.signUpFrom?.controls as { [key: string]: AbstractControl };
  }

  constructor() {
    addIcons({ eyeOff });
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  submitForm(): void {
  }

  forgotPassword() {
    // Handle forgot password logic
    console.log('Forgot password clicked');
  }

  signUp() {
    // Navigate to signup page
    console.log('Sign up clicked');
    this.router.navigate(['/sign-up']);
  }

  private destroy$ = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  registerUser() {
    // this.auth.register(this.name, this.email, this.password).pipe(
    //     takeUntil(this.destroy$)
    // ).subscribe();
  }
}