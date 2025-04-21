import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private baseUrl = 'http://localhost:8080/animal-api';

  constructor(private http: HttpClient) { }

  // Получить список всех животных пользователя
  getAnimals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/list`);
  }

  // Создать новое животное
  createAnimal(animalData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, animalData);
  }

  // Обновить данные животного
  updateAnimal(id: string, animalData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, animalData);
  }

  // Удалить животное
  deleteAnimal(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  // Получить данные конкретного животного
  getAnimalById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
