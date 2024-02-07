import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  item: string = '';
  btn: string = 'Add';
  id: number = 0;
  constructor(private todoService: TodoService) {}

  getRandomId(): number {
    return Math.floor(Math.random() * 1000);
  }

  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe({
      next: (data: Todo[]) => {
        this.todos = data;
      },
      complete: () => {
        console.log('completed');
      },
      error: (error: Error) => {
        console.log('message', error.message);
      },
    });
  }

  saveTodo(): void {
    if (this.id == 0) {
      if (this.item !== '') {
        let todo: Todo = {
          id: this.getRandomId(),
          item: this.item,
          user_Id: 1,
        };
        this.todoService.addTodo(todo).subscribe({
          next: () => {
            this.ngOnInit();
            this.item = '';
          },
          complete: () => {
            console.log('completed');
          },
          error: (error: Error) => {
            console.log('message', error.message);
          },
        });
      }
    } else {
      let newTodo = { id: this.id, item: this.item, user_Id: 1 };
      this.todoService.updateData(newTodo).subscribe({
        next: () => {
          this.ngOnInit();
          this.btn = 'Add';
          this.item = '';
        },
      });
    }
  }

  editTodo(id: number) {
    this.btn = 'Edit';
    let newTodo = this.todos.find((todo) => todo.id == id);
    this.item = newTodo?.item!;
    this.id = id;
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodoById(id).subscribe({
      next: () => {
        this.ngOnInit();
      },
      complete: () => {
        console.log('completed');
      },
      error: (error: Error) => {
        console.log('message', error.message);
      },
    });
  }
}
