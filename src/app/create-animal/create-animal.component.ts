import { Component } from '@angular/core';
import { AnimalService } from '../services/animal-service/animal.service';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-animal',
  template: `
    <div class="create-animal-container">
      <h2>Добавить новое животное</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label class="form-label">Тип животного</label>
          <input type="text" class="form-input" [(ngModel)]="animal.type" name="type" required>
        </div>
        <div class="form-group">
          <label class="form-label">Дата рождения</label>
          <input type="date" class="form-input" [(ngModel)]="animal.dateOfBirth" name="dateOfBirth">
        </div>

        <div class="buttons-container">
          <button type="submit" class="submit-button">Сохранить</button>
          <button type="button" class="cancel-button" (click)="cancel()">Отмена</button>
        </div>
      </form>
    </div>
  `,
  imports: [
    FormsModule
  ],
  styleUrls: ['./create-animal.component.css'],
})
export class CreateAnimalComponent {
  animal: any = {
    type: '',
    dateOfBirth: ''
  };

  constructor(
    private animalService: AnimalService,
    private router: Router
  ) {}

  onSubmit() {
    this.animalService.createAnimal(this.animal).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => console.error('Error creating animal', err)
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
