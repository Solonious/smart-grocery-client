import { Component, inject } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonIcon, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar],
  templateUrl: './home.component.html',})
export class HomeComponent {

  authService = inject(AuthService);

  constructor() {
    addIcons({ library, playCircle, radio, search });
  }

  signOut(): void { 
    // Handle sign out logic
    console.log('Sign out clicked');

    this.authService.logout();
  }
}