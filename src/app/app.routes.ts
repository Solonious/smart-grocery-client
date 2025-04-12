import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { InitPageComponent } from './components/init-page/init-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
              path: 'shopping',
              loadChildren: () => import('./components/shopping-page/shopping-page.routes').then((m) => m.SHOPPING_ROUTES),
            },
            {
              path: 'dashboard',
              loadComponent: () => import('./components/dashboard-page/dashboard-page.component').then((m) => m.DashboardPageComponent),
            },
            {
              path: 'settings',
              loadComponent: () => import('./components/settings-page/settings-page.component').then((m) => m.SettingsPageComponent),
            },
            {
              path: '',
              redirectTo: 'shopping',
              pathMatch: 'full',
            },
          ],
    },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'login', component: LoginComponent },
    { path: 'init-page', component: InitPageComponent },
    { path: '**', redirectTo: '' }
];
