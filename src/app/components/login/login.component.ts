import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonList, IonItem, IonLabel, IonInput, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { eyeOff } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
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
export class LoginComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  
  private router = inject(Router);

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });
  isSubmitted = false;
  passwordType = 'password';
  passwordIcon = 'eye-off';

  constructor() {
      addIcons({ eyeOff });
    }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  get errorControl() {
    return this.loginForm?.controls as { [key: string]: AbstractControl };
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
}