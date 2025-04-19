import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  // Общие поля
  email = '';
  phoneNumber = '';

  // Поля для пользователя
  firstName = '';

  // Поля для доктора
  fullName = '';

  isDoctor = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    this.isDoctor = roles.includes('ROLE_ADMIN');
    this.loadUserData();
  }

  loadUserData() {
    this.userService.getUserProfile().subscribe({
      next: (userData: any) => {
        this.email = userData.email || '';
        this.phoneNumber = userData.phoneNumber || '';
        this.firstName = userData.firstName || '';
        this.fullName = userData.fullName || '';
      },
      error: (err) => {
        console.error('Failed to load user data:', err);
      }
    });
  }

  saveProfile() {
    const profileData = {
      email: this.email,
      phoneNumber: this.phoneNumber,
      firstName: this.isDoctor ? null : this.firstName,
      fullName: this.isDoctor ? this.fullName : null
    };

    this.userService.updateProfile(profileData).subscribe({
      next: (updatedUser) => {
        console.log('Profile updated successfully:', updatedUser);
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Profile update error:', err);
        this.errorMessage = err.error?.message || 'Ошибка при сохранении профиля';
      }
    });
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
