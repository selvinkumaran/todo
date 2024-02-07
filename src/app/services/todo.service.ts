import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:8080/api/todo/all/1');
  }

  addTodo(todos: Todo): Observable<Todo[]> {
    return this.http.post<Todo[]>('http://localhost:8080/api/todo/', todos);
  }

  updateData(todos: Todo): Observable<Todo[]> {
    return this.http.put<Todo[]>('http://localhost:8080/api/todo/', todos);
  }
  deleteTodoById(id: number): Observable<Todo[]> {
    return this.http.delete<Todo[]>('http://localhost:8080/api/todo/delete/' + id);
  }
}
