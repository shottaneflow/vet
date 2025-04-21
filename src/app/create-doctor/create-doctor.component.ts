import { Component } from '@angular/core';
import { VetService } from '../services/vet-service/vet.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-doctor',
  imports: [
    FormsModule
  ],
  templateUrl: './create-doctor.component.html',
  styleUrls: [`/create-doctor.component.css`]
})
export class CreateDoctorComponent {
  doctor = {
    fullName: '',
    email: '',
    phoneNumber: ''
  };

  errorMessage: string = ''; // Добавляем переменную для хранения ошибок

  constructor(
    private vetService: VetService,
    private router: Router
  ) { }

  createDoctor(): void {
    this.errorMessage = ''; // Очищаем предыдущие ошибки

    this.vetService.createDoctor(this.doctor).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        console.error('Error creating doctor:', err);
        this.errorMessage = this.getErrorMessage(err); // Устанавливаем сообщение об ошибке
      }
    });
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  // Метод для форматирования сообщения об ошибке
  private getErrorMessage(error: any): string {
    if (error.status === 0) {
      return 'Нет соединения с сервером';
    }
    if (error.error && error.error.message) {
      return error.error.message;
    }
    return 'Произошла ошибка при создании врача';
  }
}
