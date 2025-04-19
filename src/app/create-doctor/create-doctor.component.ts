import { Component } from '@angular/core';
import { VetService } from '../services/vet-service/vet.service';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-doctor',
  imports: [
    FormsModule
  ],
  templateUrl: './create-doctor.component.html'
})
export class CreateDoctorComponent {
  doctor = {
    fullName: '',
    email: '',
    phoneNumber: ''
  };

  constructor(
    private vetService: VetService,
    private router: Router
  ) { }

  createDoctor(): void {
    this.vetService.createDoctor(this.doctor).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => console.error('Error creating doctor:', err)
    });
  }
  goToHome(): void {
    this.router.navigate(['/']);
  }
}
