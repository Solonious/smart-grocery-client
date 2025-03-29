import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { InitPageComponent } from './components/init-page/init-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard], pathMatch: 'full' },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'login', component: LoginComponent },
    { path: 'init-page', component: InitPageComponent },
    { path: '**', redirectTo: '' }
];
