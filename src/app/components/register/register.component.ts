import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  users: User[] = [];

  name: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService) {}

  getRandomId(): number {
    return Math.floor(Math.random() * 1000);
  }

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      complete: () => {
        console.log('completed');
      },
      error: (error: Error) => {
        console.log('message', error.message);
      },
    });
  }
  register(): void {
    let user: User = {
      id: this.getRandomId(),
      username: this.username,
      password: this.password,
    };
    this.authService.addUser(user).subscribe({
      next: () => {},
      complete: () => {
        console.log('completed');
      },
      error: (error: Error) => {
        console.log('message', error.message);
      },
    });
  }
}
