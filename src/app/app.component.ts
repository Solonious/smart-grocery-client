import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from "@ionic/angular/standalone";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonRouterOutlet, IonApp],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}