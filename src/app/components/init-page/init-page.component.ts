import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { IonContent, IonButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { logoFacebook, logoApple, logoGoogle} from 'ionicons/icons';

@Component({
  selector: 'app-init-page',
  standalone: true,
  imports: [IonIcon, IonButton, IonContent],
  templateUrl: './init-page.component.html',
  styleUrls: ['./init-page.component.css'],
})
export class InitPageComponent {

  private router = inject(Router);

  constructor() {
    addIcons({ logoFacebook, logoApple, logoGoogle });
  }

  navigateToSignIn() {
    console.log('Sign in clicked');
    this.router.navigate(['/login']);
  }

  navigateToSignUp() {
    this.router.navigate(['/sign-up']);
  }

  


}
