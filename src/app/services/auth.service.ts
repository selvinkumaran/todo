import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/api/user');
  }

  addUser(todos: User): Observable<User[]> {
    return this.http.post<User[]>(
      'http://localhost:8080/api/user/register/',
      todos
    );
  }
}
