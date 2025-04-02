import { Component, ViewChild } from '@angular/core';
import {
  IonTabBar,
  IonTabButton,
  IonTabs, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cogOutline, search, statsChartOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonIcon, 
    IonTabBar,
    IonTabButton,
    IonTabs
  ],
  templateUrl: './home.component.html',})
export class HomeComponent {

  constructor(private authService: AuthService) {
    addIcons({search, cogOutline, statsChartOutline });
  }

  signOut(): void {
    this.authService.logout();
  }
}