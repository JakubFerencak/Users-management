import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  usersService = inject(UsersService);
  router = inject(Router);
  loggedUser = '';

  ngOnInit(): void {
    this.usersService.loggedUser().subscribe(username => this.loggedUser = username);
  }
  logout() {
    this.usersService.logout().subscribe(() => {
      this.router.navigateByUrl("/login");
    });
  }
}
