import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './guard/auth.guard';
import {CreateDoctorComponent} from './create-doctor/create-doctor.component';
import { CreateAnimalComponent } from './create-animal/create-animal.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard] // Защищаем страницу профиля
  },
  { path: 'create-animal', component: CreateAnimalComponent,canActivate: [AuthGuard] },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard] // Защищаем главную страницу
  },
  { path: 'create-doctor',
    component: CreateDoctorComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' },



];
