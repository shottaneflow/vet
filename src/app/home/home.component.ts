import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { VetService } from '../services/vet-service/vet.service';
import { AnimalService } from '../services/animal-service/animal.service';
import { FormsModule } from '@angular/forms';
import { VaccinationService } from '../services/vaccination-service/vaccination.service';
import { VisitService } from '../services/visit-service/visit.service';

@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, FormsModule, DatePipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAdmin = false;
  doctors: any[] = [];
  animals: any[] = [];
  editMode: { [key: string]: boolean } = {};
  animalEditMode: { [key: string]: boolean } = {};

  showVaccinationsModal = false;
  showVisitsModal = false;
  selectedAnimalId: string | null = null;

  vaccinations: any[] = [];
  vaccinationEditMode: { [key: string]: boolean } = {};
  newVaccination: any = {
    name: '',
    date: ''
  };

  visits: any[] = [];
  visitEditMode: { [key: string]: boolean } = {};
  newVisit: any = {
    visitDate: '',
    doctorId: ''
  };

  constructor(
    private router: Router,
    private vetService: VetService,
    private vaccinationService: VaccinationService,
    private visitService: VisitService,
    private animalService: AnimalService
  ) {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    this.isAdmin = roles.includes('ROLE_ADMIN');
  }

  ngOnInit(): void {
    if (this.isAdmin) {
      this.loadDoctors();
    } else {
      this.loadDoctors();
      this.loadAnimals();
    }
  }

  loadDoctors(): void {
    this.vetService.getDoctors().subscribe(
      (doctors) => this.doctors = doctors,
      (error) => console.error('Error loading doctors', error)
    );
  }

  loadAnimals(): void {
    this.animalService.getAnimals().subscribe(
      (animals) => this.animals = animals,
      (error) => console.error('Error loading animals', error)
    );
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  goToCreateAnimal(): void {
    this.router.navigate(['/create-animal']);
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

  toggleAnimalEditMode(id: string): void {
    this.animalEditMode[id] = !this.animalEditMode[id];
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

  updateAnimal(animal: any): void {
    this.animalService.updateAnimal(animal.id, animal).subscribe(
      () => {
        this.toggleAnimalEditMode(animal.id);
        this.loadAnimals();
      },
      (error) => console.error('Error updating animal', error)
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

  deleteAnimal(id: string): void {
    if (confirm('Вы уверены, что хотите удалить это животное?')) {
      this.animalService.deleteAnimal(id).subscribe(
        () => this.loadAnimals(),
        (error) => console.error('Error deleting animal', error)
      );
    }
  }

  openVaccinationsModal(animalId: string): void {
    this.selectedAnimalId = animalId;
    this.loadVaccinations(animalId);
    this.showVaccinationsModal = true;
  }

  loadVaccinations(animalId: string): void {
    this.vaccinationService.getByAnimal(animalId).subscribe(
      (vaccinations) => this.vaccinations = vaccinations,
      (error) => console.error('Error loading vaccinations', error)
    );
  }

  addVaccination(): void {
    if (!this.selectedAnimalId) return;

    this.vaccinationService.create(this.selectedAnimalId, this.newVaccination).subscribe(
      () => {
        this.loadVaccinations(this.selectedAnimalId!);
        this.newVaccination = { name: '', date: '' };
      },
      (error) => console.error('Error adding vaccination', error)
    );
  }

  updateVaccination(vaccination: any): void {
    this.vaccinationService.update(vaccination.id, vaccination).subscribe(
      () => {
        this.toggleVaccinationEditMode(vaccination.id);
        this.loadVaccinations(this.selectedAnimalId!);
      },
      (error) => console.error('Error updating vaccination', error)
    );
  }

  deleteVaccination(id: string): void {
    if (confirm('Вы уверены, что хотите удалить эту прививку?')) {
      this.vaccinationService.delete(id).subscribe(
        () => this.loadVaccinations(this.selectedAnimalId!),
        (error) => console.error('Error deleting vaccination', error)
      );
    }
  }

  toggleVaccinationEditMode(id: string): void {
    this.vaccinationEditMode[id] = !this.vaccinationEditMode[id];
  }

  openVisitsModal(animalId: string): void {
    this.selectedAnimalId = animalId;
    this.loadVisits(animalId);
    this.showVisitsModal = true;
  }

  loadVisits(animalId: string): void {
    this.visitService.getByAnimal(animalId).subscribe(
      (visits) => this.visits = visits,
      (error) => console.error('Error loading visits', error)
    );
  }

  addVisit(): void {
    if (!this.selectedAnimalId) return;

    this.visitService.create(this.selectedAnimalId, this.newVisit.doctorId, this.newVisit).subscribe(
      () => {
        this.loadVisits(this.selectedAnimalId!);
        this.newVisit = { visitDate: '', doctorId: '' };
      },
      (error) => console.error('Error adding visit', error)
    );
  }

  updateVisit(visit: any): void {
    this.visitService.update(visit.id, visit).subscribe(
      () => {
        this.toggleVisitEditMode(visit.id);
        this.loadVisits(this.selectedAnimalId!);
      },
      (error) => console.error('Error updating visit', error)
    );
  }

  deleteVisit(id: string): void {
    if (confirm('Вы уверены, что хотите удалить этот визит?')) {
      this.visitService.delete(id).subscribe(
        () => this.loadVisits(this.selectedAnimalId!),
        (error) => console.error('Error deleting visit', error)
      );
    }
  }

  toggleVisitEditMode(id: string): void {
    this.visitEditMode[id] = !this.visitEditMode[id];
  }

  getDoctorName(doctorId: string): string {
    const doctor = this.doctors.find(d => d.id === doctorId);
    return doctor ? doctor.fullName : 'Неизвестный врач';
  }
}
