import { Component, inject } from '@angular/core';
import { Auth } from '../../entities/auth';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  auth: Auth = new Auth("Peter","sovy");
  errorMessage = '';
  usersService = inject(UsersService);
  router = inject(Router);

  onSubmit() {
    //odoslať auth ako rest request
    console.log("odosielam ", this.auth);
    this.usersService.login(this.auth).subscribe({
      next: success => {
        if (success) {
          // idem na autorizovanu sekciu
          this.router.navigateByUrl("/extended-users");
        } else {
          // dal som zle heslo alebo login
          this.errorMessage = "Wrong name or password, try again.";
        }
      },
      error: err => {
        this.errorMessage = "Server down!";
      }
    });
  }
}
