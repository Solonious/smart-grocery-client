import { Component, ViewChild } from '@angular/core';

import { LoginComponent } from '../login/login.component';
import { IonNav, IonContent, IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon } from "@ionic/angular/standalone";
import { SignUpComponent } from '../sign-up/sign-up.component';
import { addIcons } from 'ionicons';
import { logoFacebook, logoApple, logoGoogle} from 'ionicons/icons';

@Component({
  selector: 'app-init-page',
  standalone: true,
  imports: [IonIcon, IonButtons, IonTitle, IonToolbar, IonHeader, IonModal, IonButton, IonContent, IonNav],
  templateUrl: './init-page.component.html',
  styleUrls: ['./init-page.component.css'],
})
export class InitPageComponent {
  @ViewChild('nav') private nav!: IonNav;

  constructor() {
    addIcons({ logoFacebook, logoApple, logoGoogle });
  }

  onLoginClick() {
    this.nav.setRoot(LoginComponent);
  }

  onSignInClick(): void {
    console.log('Sign Up button clicked');
    this.nav.setRoot(SignUpComponent);
  }
}
