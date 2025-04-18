import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.token); // Сохранение токена
        this.router.navigate(['/']); // Перенаправление на главную
      },
      error: (err) => {
        this.errorMessage = 'Неправильный логин или пароль';
      }
    });
  }
}
