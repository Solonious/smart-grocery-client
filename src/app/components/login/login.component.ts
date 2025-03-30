import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonList, IonItem, IonLabel, IonInput, IonIcon, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { eyeOff } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    IonTitle,
    IonBackButton,
    IonButtons,
    IonToolbar,
    IonHeader,  
    IonIcon,
    IonInput,
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    IonButton,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  
  private router = inject(Router);

  private authService = inject(AuthService);

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  isSubmitted = false;
  passwordType = 'password';
  passwordIcon = 'eye-off';

  get errorControl() {
    return this.loginForm?.controls as { [key: string]: AbstractControl };
  }

  constructor() {
      addIcons({ eyeOff });
    }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  submitForm(): void {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).pipe(
      take(1)
    ).subscribe();
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
}