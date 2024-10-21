import { Injectable } from '@angular/core';
import { User } from '../entities/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [
    new User("JanoService", "jano@jano.sk", 1, new Date()),
    new User("FeroService", "fero@jano.sk"),
    {name: "AnkaService", email: "anka@anka.sk", password: "qwerty"}
  ];
  constructor() { }

  getSynchronousUsers(): User[] {
    return this.users;
  }

  getUsers():Observable<User[]> {
    return of(this.users);
  }
}
