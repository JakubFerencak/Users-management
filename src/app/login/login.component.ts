import { Component, inject } from '@angular/core';
import { Auth } from '../../entities/auth';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  auth: Auth = new Auth("abc","xyz");
  usersService = inject(UsersService);

  onSubmit() {
    //odoslať auth ako rest request
    console.log("odosielam ", this.auth);
    this.usersService.login(this.auth).subscribe(token => console.log("token: ", token));
  }
}
