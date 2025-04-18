import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/login']); // Перенаправление на вход
      },
      error: (err) => {
        this.errorMessage = 'Ошибка регистрации';
      }
    });
  }
}
