import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { VetService } from '../services/vet-service/vet.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAdmin = false;
  doctors: any[] = [];
  editMode: { [key: string]: boolean } = {};

  constructor(
    private router: Router,
    private vetService: VetService
  ) {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    this.isAdmin = roles.includes('ROLE_ADMIN');
  }

  ngOnInit(): void {
    if (this.isAdmin) {
      this.loadDoctors();
    }
  }

  loadDoctors(): void {
    this.vetService.getDoctors().subscribe(
      (doctors) => this.doctors = doctors,
      (error) => console.error('Error loading doctors', error)
    );
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.router.navigate(['/login']);
  }

  goToCreateDoctor(): void {
    this.router.navigate(['/create-doctor']);
  }

  toggleEditMode(id: string): void {
    this.editMode[id] = !this.editMode[id];
  }

  updateDoctor(doctor: any): void {
    this.vetService.updateDoctor(doctor.id, doctor).subscribe(
      () => {
        this.toggleEditMode(doctor.id);
        this.loadDoctors();
      },
      (error) => console.error('Error updating doctor', error)
    );
  }

  deleteDoctor(id: string): void {
    if (confirm('Вы уверены, что хотите удалить этого врача?')) {
      this.vetService.deleteDoctor(id).subscribe(
        () => this.loadDoctors(),
        (error) => console.error('Error deleting doctor', error)
      );
    }
  }
}
